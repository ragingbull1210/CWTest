import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, IconButton, useTheme, withStyles } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Product } from "../../models/product";

import ResponsiveAppBar from "./AppBar";
import ProductsTable from "../features/ProductsTable";
import ProductDetails from "../features/ProductDetails";
import ProductForm from "../features/ProductForm";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:5000/api/products")
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      });
  }, []);

  return (
    <div>
      <ResponsiveAppBar pages={["+ Add Product"]} />
      <ProductsTable products={products} productsPerPage={5} />
      {products[0] && <ProductDetails product={products[0]} />}
      <ProductForm />
    </div>
  );
}

export default App;
