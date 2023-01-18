import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Product } from "../../models/product";
import ActionButton from "./ActionButton";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Product Name
        </Typography>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Price
        </Typography>
        <Typography variant="h5" component="div">
          ${product.price}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Type
        </Typography>
        <Typography variant="h5" component="div">
          {product.type}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Active State
        </Typography>
        <Typography variant="h5" component="div">
          {product.active ? "Active" : "Inactive"}
        </Typography>
      </CardContent>
      <CardActions>
        <ActionButton color="info" name="Edit" />
        <ActionButton color="secondary" name="Cancel" />
      </CardActions>
    </Card>
  );
}
