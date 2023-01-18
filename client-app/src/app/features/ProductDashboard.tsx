import { observer } from "mobx-react-lite";
import { Product } from "../../models/product";
import { useStore } from "../stores/store";
import ProductDetails from "./ProductDetails";
import ProductForm from "./ProductForm";
import ProductsTable from "./ProductsTable";

interface Props {
  products: Product[];
  handleDeleteProduct: (id: string) => void;
  submitting: boolean;
}

export default observer(function ProductDashboard({
  products,
  handleDeleteProduct,
  submitting,
}: Props) {
  const { productStore } = useStore();
  const { selectedProduct, editMode } = productStore;
  return (
    <>
      <ProductsTable
        products={products}
        productsPerPage={5}
        handleDeleteProduct={handleDeleteProduct}
        submitting={submitting}
      />
      {selectedProduct && !editMode && <ProductDetails />}
      {editMode && <ProductForm />}
    </>
  );
});
