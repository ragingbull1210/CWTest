import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../../models/product";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ProductStore {
  products: Product[] = [];
  selectedProduct: Product | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadProducts = async () => {
    this.loadingInitial = true;
    try {
      const products = await agent.Products.list();
      runInAction(() => {
        this.products = products;
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectProduct = (id: string) => {
    this.selectedProduct = this.products.find((p) => p.id === id);
  };

  cancelSelectedProduct = () => {
    this.selectedProduct = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectProduct(id) : this.cancelSelectedProduct();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createProduct = async (product: Product) => {
    this.loading = true;
    product.active = Boolean(product.active);
    product.id = uuid();
    try {
      await agent.Products.create(product);
      runInAction(() => {
        this.products.push(product);
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
        this.products = [
          ...this.products.filter((p) => p.id !== product.id),
          product,
        ];
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
}
