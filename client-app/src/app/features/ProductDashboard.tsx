import { Product } from "../../models/product";
import ProductDetails from "./ProductDetails";
import ProductForm from "./ProductForm";
import ProductsTable from "./ProductsTable";

interface Props {
  products: Product[];
  selectedProduct: Product | undefined;
  handleSelectedProduct: (id: string) => void;
  handleCancelSelectProduct: () => void;
  editMode: boolean;
  handleFormOpen: (id?: string) => void;
  handleFormClose: () => void;
  handleCreateOrEditProduct: (product: Product) => void;
  handleDeleteProduct: (id: string) => void;
  submitting: boolean;
}

export default function ProductDashboard({
  products,
  selectedProduct,
  handleSelectedProduct,
  handleCancelSelectProduct,
  editMode,
  handleFormOpen,
  handleFormClose,
  handleCreateOrEditProduct,
  handleDeleteProduct,
  submitting,
}: Props) {
  return (
    <>
      <ProductsTable
        products={products}
        productsPerPage={5}
        handleSelectedProduct={handleSelectedProduct}
        handleFormOpen={handleFormOpen}
        handleDeleteProduct={handleDeleteProduct}
        submitting={submitting}
      />
      {selectedProduct && !editMode && (
        <ProductDetails
          product={selectedProduct}
          handleCancelSelectProduct={handleCancelSelectProduct}
          handleFormOpen={handleFormOpen}
        />
      )}
      {editMode && (
        <ProductForm
          handleFormClose={handleFormClose}
          product={selectedProduct}
          handleCreateOrEditProduct={handleCreateOrEditProduct}
          submitting={submitting}
        />
      )}
    </>
  );
}
