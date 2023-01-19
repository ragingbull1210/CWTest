import {
  Box,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import ActionButton from "./ActionButton";
import { LoadingButton } from "@mui/lab";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { NavLink, useParams } from "react-router-dom";
import LoadingComponent from "../layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Product } from "../../models/product";
import * as Yup from "yup";

export default observer(function ProductForm() {
  const navigate = useNavigate();
  const { productStore } = useStore();
  const { createProduct, updateProduct, loading, loadProduct, loadingInitial } =
    productStore;

  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: 0.0,
    type: "Books",
    active: false,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("The product name is required"),
    price: Yup.number()
      .moreThan(0, "The price must be greater than 0")
      .required("The price is required"),
    type: Yup.string().required("Product type needs to be selected."),
    active: Yup.boolean(),
  });

  useEffect(() => {
    if (id) loadProduct(id).then((product) => setProduct(product!));
  }, [id, loadProduct]);

  const handleFormSubmit = (product: Product) => {
    //event.preventDefault();
    console.log(product);
    if (product.id.length === 0) {
      const newProduct = {
        ...product,
        id: uuid(),
      };
      createProduct(newProduct).then(() =>
        navigate(`/products/${newProduct.id}`)
      );
    } else {
      updateProduct(product).then(() => {
        navigate(`/products/${product.id}`);
      });
    }
  };

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  //can't use handleInputChange as typescript gives us a bug when extracting event.target.checked
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const { name } = event.target;
    setProduct({ ...product, [name]: isChecked });
  };

  if (loadingInitial) return <LoadingComponent />;

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#e3f2fd", height: "100vh" }}>
          <Card sx={{ textAlign: "left", width: "60%", m: "0 auto" }}>
            <Container>
              <Typography variant="h5" sx={{ mt: 3 }}>
                {product.id ? "Edit Product" : "Add Product"}
              </Typography>
              <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={product}
                onSubmit={(values) => handleFormSubmit(values)}
              >
                {({ errors, touched, handleSubmit }) => (
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Product Name"
                      value={product.name}
                      onChange={handleInputChange}
                      sx={{ my: 2 }}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <br />
                    <TextField
                      fullWidth
                      id="price"
                      name="price"
                      label="Price($)"
                      value={product.price}
                      onChange={handleInputChange}
                      sx={{ my: 2 }}
                      error={touched.price && Boolean(errors.price)}
                      helperText={touched.price && errors.price}
                    />
                    <br />
                    <FormControl sx={{ minWidth: 250 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Type
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product.type}
                        name="type"
                        onChange={handleInputChange}
                        sx={{ my: 2, mr: 2 }}
                        error={touched.type && Boolean(errors.type)}
                      >
                        <MenuItem value="Books">Books</MenuItem>
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Furniture">Furniture</MenuItem>
                        <MenuItem value="Toys">Toys</MenuItem>
                      </Select>
                      {touched.type && errors.type ? (
                        <FormHelperText>{errors.type}</FormHelperText>
                      ) : null}
                    </FormControl>
                    <br />
                    <FormControlLabel
                      sx={{ my: 2 }}
                      control={
                        <Checkbox
                          checked={product.active}
                          onChange={handleCheckboxChange}
                          value={product.active ? "true" : "false"}
                          name="active"
                        />
                      }
                      label="Active"
                    />
                    <br />
                    <div style={{ marginBottom: 15 }}>
                      <LoadingButton
                        color="primary"
                        name="Submit"
                        type="submit"
                        variant="contained"
                        loading={loading}
                        size="medium"
                        sx={{ mr: 2 }}
                      >
                        Submit
                      </LoadingButton>
                      <NavLink to="/" style={{ textDecoration: "none" }}>
                        <ActionButton
                          color="secondary"
                          name="Cancel"
                          type="button"
                        />
                      </NavLink>
                    </div>
                  </form>
                )}
              </Formik>
            </Container>
          </Card>
        </Box>
      </Container>
    </>
  );
});
