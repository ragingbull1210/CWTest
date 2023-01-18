import React from "react";
import ResponsiveAppBar from "./AppBar";
import ProductDashboard from "../features/ProductDashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductForm from "../features/ProductForm";
import ProductDetails from "../features/ProductDetails";

function App() {
  const location = useLocation();
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<ProductDashboard />} />
        <Route path="/addproduct" element={<ProductForm />} />
        <Route
          key={location.key}
          path="/manage/:id"
          element={<ProductForm />}
        />
        <Route
          key={location.key}
          path="/products/:id"
          element={<ProductDetails />}
        />
      </Routes>
    </>
  );
}

export default observer(App);
