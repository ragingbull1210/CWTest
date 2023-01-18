import React from "react";
import { CircularProgress, Container } from "@mui/material";

export default function LoadingComponent() {
  return (
    <Container
      sx={{
        mt: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
}
