import { makeObservable, observable } from "mobx";

export default class ProductStore {
  title = "Hello from MobX";

  constructor() {
    makeObservable(this, {
      title: observable,
    });
  }
}
