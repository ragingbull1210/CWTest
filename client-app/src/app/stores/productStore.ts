import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../../models/product";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

interface Props {
  directions: "desc" | "asc" | undefined;
}

export default class ProductStore {
  productRegistry = new Map<string, Product>();
  selectedProduct: Product | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  nameSortDirection: Props["directions"] = "asc";
  priceSortDirection: Props["directions"] = undefined;
  typeSortDirection: Props["directions"] = undefined;
  activeSortDirection: Props["directions"] = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get sortedProducts() {
    if (this.activeSortDirection === "desc") {
      return this.productsByDescendingActive();
    } else if (this.activeSortDirection === "asc") {
      return this.productsByAscendingActive();
    } else if (this.typeSortDirection === "desc") {
      return this.productsByDescendingType();
    } else if (this.typeSortDirection === "asc") {
      return this.productsByAscendingType();
    } else if (this.priceSortDirection === "desc") {
      return this.productsByDescendingPrice();
    } else if (this.priceSortDirection === "asc") {
      return this.productsByAscendingPrice();
    } else if (this.nameSortDirection === "desc") {
      return this.productsByDescendingName();
    }
    return this.productsByAscendingName();
  }

  productsByAscendingName() {
    return Array.from(this.productRegistry.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  productsByDescendingName() {
    return Array.from(this.productRegistry.values()).sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  productsByAscendingPrice() {
    return Array.from(this.productRegistry.values()).sort((a, b) => {
      return a.price - b.price;
    });
  }

  productsByDescendingPrice() {
    return Array.from(this.productRegistry.values()).sort((a, b) => {
      return b.price - a.price;
    });
  }

  productsByAscendingType() {
    return Array.from(this.productRegistry.values()).sort((a, b) =>
      a.type.localeCompare(b.type)
    );
  }

  productsByDescendingType() {
    return Array.from(this.productRegistry.values()).sort((a, b) =>
      b.type.localeCompare(a.type)
    );
  }

  productsByAscendingActive() {
    return Array.from(this.productRegistry.values()).sort((a, b) =>
      a.active.toString().localeCompare(b.active.toString())
    );
  }

  productsByDescendingActive() {
    return Array.from(this.productRegistry.values()).sort((a, b) =>
      b.active.toString().localeCompare(a.active.toString())
    );
  }

  loadProducts = async () => {
    this.loadingInitial = true;
    try {
      const products = await agent.Products.list();
      products.forEach((product) => {
        this.setProduct(product);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadProduct = async (id: string) => {
    let product = this.getProduct(id);
    if (product) {
      this.selectedProduct = product;
      return product;
    } else {
      this.loadingInitial = true;
      try {
        product = await agent.Products.details(id);
        runInAction(() => {
          this.selectedProduct = product;
        });
        this.setProduct(product);
        this.setLoadingInitial(false);
        return product;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setProduct = (product: Product) => {
    this.productRegistry.set(product.id, product);
  };

  private getProduct = (id: string) => {
    return this.productRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // selectProduct = (id: string) => {
  //   this.selectedProduct = this.productRegistry.get(id);
  // };

  // cancelSelectedProduct = () => {
  //   this.selectedProduct = undefined;
  // };

  // openForm = (id?: string) => {
  //   id ? this.selectProduct(id) : this.cancelSelectedProduct();
  //   this.editMode = true;
  // };

  // closeForm = () => {
  //   this.editMode = false;
  // };

  createProduct = async (product: Product) => {
    this.loading = true;
    //product.active = Boolean(product.active);
    product.id = uuid();
    try {
      await agent.Products.create(product);
      runInAction(() => {
        this.productRegistry.set(product.id, product);
        this.selectedProduct = product;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateProduct = async (product: Product) => {
    this.loading = true;
    try {
      await agent.Products.update(product);
      runInAction(() => {
        this.productRegistry.set(product.id, product);
        this.selectedProduct = product;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteProduct = async (id: string) => {
    this.loading = true;
    try {
      await agent.Products.delete(id);
      runInAction(() => {
        this.productRegistry.delete(id);
        //if (this.selectedProduct?.id === id) this.cancelSelectedProduct();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  toggleDirection = (state: Props["directions"]) => {
    if (state === undefined) {
      return "asc";
    } else if (state === "asc") {
      return "desc";
    } else if (state === "desc") {
      return "asc";
    }
  };

  resetDirections = () => {
    this.nameSortDirection = undefined;
    this.priceSortDirection = undefined;
    this.typeSortDirection = undefined;
    this.activeSortDirection = undefined;
  };

  changeNameSortDirection = (state: Props["directions"]) => {
    this.resetDirections();
    this.nameSortDirection = this.toggleDirection(state);
  };

  changePriceSortDirection = (state: Props["directions"]) => {
    this.resetDirections();
    this.priceSortDirection = this.toggleDirection(state);
  };

  changeTypeSortDirection = (state: Props["directions"]) => {
    this.resetDirections();
    this.typeSortDirection = this.toggleDirection(state);
  };

  changeActiveSortDirection = (state: Props["directions"]) => {
    this.resetDirections();
    this.activeSortDirection = this.toggleDirection(state);
  };
}
