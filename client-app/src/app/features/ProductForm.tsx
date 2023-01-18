import { Container } from "@mui/material";
import { Product } from "../../models/product";
import ActionButton from "./ActionButton";

interface Props {
  handleFormClose: () => void;
  product: Product | undefined;
}

export default function ProductForm({ handleFormClose, product }: Props) {
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

      <form>
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
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="price">Price</label>
          </div>
          <div>
            <input type="number" id="price" name="price" placeholder="Price" />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="type">Type</label>
          </div>
          <div>
            <select id="type" name="type">
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
            <input type="checkbox" id="active" name="active" />
          </div>
        </div>
        <br />
        <div>
          <ActionButton color="primary" type="submit" name="Submit" />
          <ActionButton
            color="secondary"
            name="Cancel"
            onClick={handleFormClose}
          />
        </div>
      </form>
    </Container>
  );
}
