import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../layout/LoadingComponent";
import { useStore } from "../stores/store";
import ActionButton from "./ActionButton";

export default observer(function ProductDetails() {
  const { productStore } = useStore();
  const { selectedProduct, openForm, cancelSelectedProduct } = productStore;

  if (!selectedProduct) return <LoadingComponent />;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Product Name
        </Typography>
        <Typography variant="h5" component="div">
          {selectedProduct.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Price
        </Typography>
        <Typography variant="h5" component="div">
          ${selectedProduct.price}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Type
        </Typography>
        <Typography variant="h5" component="div">
          {selectedProduct.type}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Active State
        </Typography>
        <Typography variant="h5" component="div">
          {selectedProduct.active ? "Active" : "Inactive"}
        </Typography>
      </CardContent>
      <CardActions>
        <ActionButton
          color="info"
          name="Edit"
          onClick={() => openForm(selectedProduct.id)}
        />
        <ActionButton
          color="secondary"
          name="Cancel"
          onClick={cancelSelectedProduct}
        />
      </CardActions>
    </Card>
  );
});
