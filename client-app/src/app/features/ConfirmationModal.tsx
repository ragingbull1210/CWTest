import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { LoadingButton } from "@mui/lab";
import { Product } from "../../models/product";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { SyntheticEvent } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  buttonName: string;
  handleClose: (e: SyntheticEvent<HTMLButtonElement>) => void;
  handleClickAction: (e: any, id: string) => void;
  product: Product;
  loading: boolean;
  target: string;
}

export default function ConfirmationModal({
  open,
  buttonName,
  handleClose,
  handleClickAction,
  product,
  loading,
  target,
}: Props) {
  return (
    <div>
      {/* <LoadingButton onClick={handleOpen}>Open modal</LoadingButton> */}
      <Modal
        open={open && target === product.id}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm {buttonName} Product?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Name:</b> {product.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Price:</b> ${Number(product.price).toFixed(2)}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Type:</b> {product.type}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Active:</b> {product.active ? <DoneIcon /> : <CloseIcon />}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <LoadingButton
              sx={{ mr: 2 }}
              color="error"
              name={product.id}
              onClick={(e) => handleClickAction(e, product.id)}
              variant="contained"
              loading={loading && target === product.id}
            >
              {buttonName}
            </LoadingButton>
            <Button
              color="secondary"
              name="Cancel"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
