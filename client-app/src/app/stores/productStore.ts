import { makeAutoObservable } from "mobx";
import { Product } from "../../models/product";
import agent from "../api/agent";

export default class ProductStore {
  products: Product[] = [];
  selectedProduct: Product | null = null;
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
      this.setProducts(products);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setProducts = (state: Product[]) => {
    this.products = state;
  };
}
