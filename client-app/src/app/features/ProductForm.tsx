import { Container } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Product } from "../../models/product";
import ActionButton from "./ActionButton";

interface Props {
  handleFormClose: () => void;
  product: Product | undefined;
  handleCreateOrEditProduct: (product: Product) => void;
}

export default function ProductForm({
  handleFormClose,
  product: selectedProduct,
  handleCreateOrEditProduct,
}: Props) {
  const initialState = selectedProduct ?? {
    id: "",
    name: "",
    price: 0.0,
    type: "",
    active: false,
  };

  const [product, setProduct] = useState(initialState);

  const handleSubmit = () => {
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
              <option value="Please select" disabled>
                Please select
              </option>
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
              onChange={handleInputChange}
            />
          </div>
        </div>
        <br />
        <div>
          <ActionButton color="primary" name="Submit" type="submit" />
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
