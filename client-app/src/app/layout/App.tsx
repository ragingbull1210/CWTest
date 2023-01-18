import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../models/product";

import ResponsiveAppBar from "./AppBar";
import ProductsTable from "../features/ProductsTable";
import ProductDetails from "../features/ProductDetails";
import ProductForm from "../features/ProductForm";
import ProductDashboard from "../features/ProductDashboard";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:5000/api/products")
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      });
  }, []);

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

  return (
    <>
      <ResponsiveAppBar pages={["+ Add Product"]} />
      <ProductDashboard
        products={products}
        selectedProduct={selectedProduct}
        handleSelectedProduct={handleSelectedProduct}
        handleCancelSelectProduct={handleCancelSelectProduct}
        editMode={editMode}
        handleFormOpen={handleFormOpen}
        handleFormClose={handleFormClose}
      />
    </>
  );
}

export default App;
