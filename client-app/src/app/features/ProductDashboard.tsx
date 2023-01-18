import { observer } from "mobx-react-lite";
import { Product } from "../../models/product";
import { useStore } from "../stores/store";
import ProductDetails from "./ProductDetails";
import ProductForm from "./ProductForm";
import ProductsTable from "./ProductsTable";

export default observer(function ProductDashboard() {
  const { productStore } = useStore();
  const { selectedProduct, editMode } = productStore;
  return (
    <>
      <ProductsTable productsPerPage={5} />
      {selectedProduct && !editMode && <ProductDetails />}
      {editMode && <ProductForm />}
    </>
  );
});
