import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../layout/LoadingComponent";
import { useStore } from "../stores/store";
import ProductsTable from "./ProductsTable";

export default observer(function ProductDashboard() {
  const { productStore } = useStore();
  const { loadProducts, productRegistry } = productStore;

  useEffect(() => {
    if (productRegistry.size <= 1) loadProducts();
  }, [loadProducts, productRegistry.size, productStore]);

  if (productStore.loadingInitial) return <LoadingComponent />;

  return (
    <>
      <ProductsTable productsPerPage={5} />
    </>
  );
});
