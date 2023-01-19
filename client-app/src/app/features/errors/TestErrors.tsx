import React, { Fragment } from "react";
import axios from "axios";
import { Box, Button, ButtonGroup, Container } from "@mui/material";

export default function TestErrors() {
  const baseUrl = "http://localhost:5000/api/";

  function handleNotFound() {
    axios
      .get(baseUrl + "buggy/not-found")
      .catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios
      .get(baseUrl + "buggy/bad-request")
      .catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios
      .get(baseUrl + "buggy/server-error")
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorised() {
    axios
      .get(baseUrl + "buggy/unauthorised")
      .catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    axios
      .get(baseUrl + "activities/notaguid")
      .catch((err) => console.log(err.response));
  }

  function handleValidationError() {
    axios
      .post(baseUrl + "activities", {})
      .catch((err) => console.log(err.response));
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#e3f2fd", height: "100vh" }}>
          <ButtonGroup color="primary" sx={{ marginTop: 50, marginLeft: 20 }}>
            <Button onClick={handleNotFound} name="Not Found">
              Not Found
            </Button>
            <Button onClick={handleBadRequest} name="Bad Request">
              Bad Request
            </Button>
            <Button onClick={handleValidationError} name="Validation Error">
              Validation Error
            </Button>
            <Button onClick={handleServerError} name="Server Error">
              Server Error
            </Button>
            <Button onClick={handleUnauthorised} name="Unauthorised">
              Unauthorised
            </Button>
            <Button onClick={handleBadGuid} name="Bad Guid">
              Bad Guid
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
    </>
  );
}
