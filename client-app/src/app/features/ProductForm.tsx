import { Button, CircularProgress, Container } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Product } from "../../models/product";
import LoadingComponent from "../layout/LoadingComponent";
import ActionButton from "./ActionButton";
import { LoadingButton } from "@mui/lab";

interface Props {
  handleFormClose: () => void;
  product: Product | undefined;
  handleCreateOrEditProduct: (product: Product) => void;
  submitting: boolean;
}

export default function ProductForm({
  handleFormClose,
  product: selectedProduct,
  handleCreateOrEditProduct,
  submitting,
}: Props) {
  const initialState = selectedProduct ?? {
    id: "",
    name: "",
    price: 0.0,
    type: "Books",
    active: false,
  };

  const [product, setProduct] = useState(initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(product);
    handleCreateOrEditProduct(product);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <Container>
      {/* <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField required type="text" id="outlined-required" label="Name" />
          <TextField
            required
            type="number"
            id="outlined-required"
            label="Price"
          />
          <TextField required type="text" id="outlined-required" label="Type" />
          <TextField type="checkbox" id="outlined-required" label="Active" />
        </div>
        <ActionButton color="primary" name="Add" />
        <ActionButton color="secondary" name="Cancel" />
      </Box> */}

      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Product Name</label>
          </div>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="price">Price</label>
          </div>
          <div>
            <input
              type="number"
              id="price"
              name="price"
              step=".01"
              placeholder="Price"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="type">Type</label>
          </div>
          <div>
            <select
              id="type"
              name="type"
              onChange={handleInputChange}
              value={product.type}
            >
              <option value="Books">Books</option>
              <option value="Electronics">Electronics</option>
              <option value="Food">Food</option>
              <option value="Furniture">Furniture</option>
              <option value="Toys">Toys</option>
            </select>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="active">Active</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={product.active}
              value={product.active ? 1 : 0}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br />
        <div>
          <LoadingButton
            color="primary"
            name="Submit"
            type="submit"
            variant="contained"
            loading={submitting}
            size="medium"
            sx={{ mr: 2 }}
          >
            Submit
          </LoadingButton>
          <ActionButton
            color="secondary"
            name="Cancel"
            onClick={handleFormClose}
            type="button"
          />
        </div>
      </form>
    </Container>
  );
}
