import React from "react";
import ResponsiveAppBar from "./AppBar";
import ProductDashboard from "../features/ProductDashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductForm from "../features/ProductForm";
import ProductDetails from "../features/ProductDetails";
import { ToastContainer } from "react-toastify";
import TestErrors from "../features/errors/TestErrors";
import NotFound from "../features/errors/NotFound";

function App() {
  const location = useLocation();
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
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
        <Route path="/testerrors" element={<TestErrors />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default observer(App);
