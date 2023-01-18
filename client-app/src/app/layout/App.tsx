import React, { useEffect, useState } from "react";
import { Product } from "../../models/product";
import ResponsiveAppBar from "./AppBar";
import ProductDashboard from "../features/ProductDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { productStore } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    productStore.loadProducts();
  }, [productStore]);

  const handleSelectedProduct = (id: string) => {
    setSelectedProduct(products.find((p) => p.id === id));
  };

  const handleCancelSelectProduct = () => {
    setSelectedProduct(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectedProduct(id) : handleCancelSelectProduct();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditProduct = (product: Product) => {
    product.active = Boolean(product.active);
    setSubmitting(true);
    if (product.id) {
      agent.Products.update(product).then(() => {
        setProducts([...products.filter((p) => p.id !== product.id), product]);
        setSelectedProduct(product);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      product.id = uuid();
      agent.Products.create(product).then(() => {
        setProducts([...products, product]);
        setSelectedProduct(product);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  };

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
      <ResponsiveAppBar pages={["+ Add Product"]} />
      <ProductDashboard
        products={productStore.products}
        selectedProduct={selectedProduct}
        handleSelectedProduct={handleSelectedProduct}
        handleCancelSelectProduct={handleCancelSelectProduct}
        editMode={editMode}
        handleFormOpen={handleFormOpen}
        handleFormClose={handleFormClose}
        handleCreateOrEditProduct={handleCreateOrEditProduct}
        handleDeleteProduct={handleDeleteProduct}
        submitting={submitting}
      />
    </>
  );
}

export default observer(App);
