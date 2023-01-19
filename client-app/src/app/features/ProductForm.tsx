import { Card, Container } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import ActionButton from "./ActionButton";
import { LoadingButton } from "@mui/lab";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { NavLink, useParams } from "react-router-dom";
import LoadingComponent from "../layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (id) loadProduct(id).then((product) => setProduct(product!));
  }, [id, loadProduct]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    <Card sx={{ textAlign: "left", width: "75%", m: "0 auto" }}>
      <Container>
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
                value={product.active ? "true" : "false"}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
          <br />
          <div style={{ marginBottom: 8 }}>
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
              <ActionButton color="secondary" name="Cancel" type="button" />
            </NavLink>
          </div>
        </form>
      </Container>
    </Card>
  );
});
