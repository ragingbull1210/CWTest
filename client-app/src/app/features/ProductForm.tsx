import { Box, Container, TextField } from "@mui/material";
import ActionButton from "./ActionButton";

export default function ProductForm() {
  return (
    <Container>
      <Box
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
      </Box>
    </Container>
  );
}
