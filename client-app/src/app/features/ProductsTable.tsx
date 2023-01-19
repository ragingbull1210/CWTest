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
import { SyntheticEvent, useState } from "react";
import FooterPagination from "./FooterPagination";
import ActionButton from "./ActionButton";
import { LoadingButton } from "@mui/lab";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

interface ProductsTableProps {
  productsPerPage: number;
}

export default observer(function ProductsTable({
  productsPerPage,
}: ProductsTableProps) {
  const { productStore } = useStore();
  const { deleteProduct, sortedProducts, loading } = productStore;

  const [page, setPage] = useState<number>(0);
  const [target, setTarget] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = (e: SyntheticEvent<HTMLButtonElement>) => {
    setOpen(true);
    setTarget(e.currentTarget.name);
  }
  const handleClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    setOpen(false);
    setTarget('');
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const HandleProductDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteProduct(id);
    setOpen(false);
  };

  return (
    <>
      <NavLink to="/addproduct" style={{ textDecoration: "none" }}>
        <ActionButton
          color="primary"
          name="Add Product"
          marginTop={3}
          marginLeft={16}
        // onClick={productStore.openForm}
        />
      </NavLink>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "#2196f3",
            }}
          >
            <TableRow>
              <TableCell>
                <TableSortLabel
                  direction={productStore.nameSortDirection}
                  active={productStore.nameSortDirection !== undefined}
                  onClick={() =>
                    productStore.changeNameSortDirection(
                      productStore.nameSortDirection
                    )
                  }
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <TableSortLabel
                  direction={productStore.priceSortDirection}
                  active={productStore.priceSortDirection !== undefined}
                  onClick={() =>
                    productStore.changePriceSortDirection(
                      productStore.priceSortDirection
                    )
                  }
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  direction={productStore.typeSortDirection}
                  active={productStore.typeSortDirection !== undefined}
                  onClick={() =>
                    productStore.changeTypeSortDirection(
                      productStore.typeSortDirection
                    )
                  }
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  direction={productStore.activeSortDirection}
                  active={productStore.activeSortDirection !== undefined}
                  onClick={() =>
                    productStore.changeActiveSortDirection(
                      productStore.activeSortDirection
                    )
                  }
                >
                  Active
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(sortedProducts.length > 0
              ? sortedProducts.slice(
                page * productsPerPage,
                page * productsPerPage + productsPerPage
              )
              : sortedProducts
            ).map((product: Product) => (
              <TableRow
                key={product.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <NavLink
                    to={`/products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ActionButton color="info" name="Edit" />
                  </NavLink>
                </TableCell>
                <TableCell>
                  <LoadingButton
                    color="error"
                    name={product.id}
                    onClick={handleOpen}
                    variant="contained"
                    loading={loading && target === product.id}
                  >
                    Delete
                  </LoadingButton>
                  <ConfirmationModal
                    open={open}
                    buttonName="Delete"
                    handleClose={handleClose}
                    handleClickAction={(e) =>
                      HandleProductDelete(e, product.id)
                    }
                    product={product}
                    loading={loading}
                    target={target}
                  />
                </TableCell>
                <TableCell>${Number(product.price).toFixed(2)}</TableCell>
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
                productsLength={sortedProducts.length}
                page={page}
                handleChangePage={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
});
