import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.get(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.get(url, body).then(responseBody),
  del: (url: string) => axios.get(url).then(responseBody),
};

const Products = {
  list: () => requests.get("/products"),
};

const agent = {
  Products,
};

export default agent;
