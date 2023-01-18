import React, { useEffect, useState } from "react";
import { Product } from "../../models/product";
import ResponsiveAppBar from "./AppBar";
import ProductDashboard from "../features/ProductDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { productStore } = useStore();
  const [products, setProducts] = useState<Product[]>([]);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    productStore.loadProducts();
  }, [productStore]);

  const handleDeleteProduct = (id: string) => {
    setSubmitting(true);
    agent.Products.delete(id).then(() => {
      setProducts([...products.filter((p) => p.id !== id)]);
      setSubmitting(false);
    });
  };

  if (productStore.loadingInitial) return <LoadingComponent />;

  return (
    <>
      <ResponsiveAppBar />
      <ProductDashboard
        products={productStore.products}
        handleDeleteProduct={handleDeleteProduct}
        submitting={submitting}
      />
    </>
  );
}

export default observer(App);
