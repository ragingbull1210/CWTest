import { makeAutoObservable } from "mobx";

export default class ProductStore {
  title = "Hello from MobX";

  constructor() {
    makeAutoObservable(this);
  }

  setTitle = () => {
    this.title += "!";
  };
}
