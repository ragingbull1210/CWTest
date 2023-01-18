import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Product } from "../../models/product";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import FooterPagination from "./FooterPagination";
import ActionButton from "./ActionButton";

interface ProductsTableProps {
  products: Product[];
  productsPerPage: number;
}

export default function ProductsTable({
  products,
  productsPerPage,
}: ProductsTableProps) {
  const [page, setPage] = useState<number>(0);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <>
      <ActionButton color="primary" name="+Add Product" marginTop={3} />
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "#2196f3",
            }}
          >
            <TableRow>
              <TableCell>
                <TableSortLabel active={true}>Name</TableSortLabel>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(products.length > 0
              ? products.slice(
                  page * productsPerPage,
                  page * productsPerPage + productsPerPage
                )
              : products
            ).map((product: Product) => (
              <TableRow
                key={product.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <ActionButton color="info" name="Edit" />
                </TableCell>
                <TableCell>
                  <ActionButton color="error" name="Delete" />
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>
                  {product.active ? <DoneIcon /> : <CloseIcon />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow
              sx={{ display: "flex", justifyContent: "right", width: 650 }}
            >
              <FooterPagination
                productsPerPage={productsPerPage}
                productsLength={products.length}
                page={page}
                handleChangePage={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
