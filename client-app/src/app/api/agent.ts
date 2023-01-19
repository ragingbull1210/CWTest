import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Product } from "../../models/product";
import { useNavigate } from "react-router-dom";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        toast.error("bad request");
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 404:
        toast.error("not found");
        break;
      case 405:
        toast.error("server error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Products = {
  list: () => requests.get<Product[]>("/products"),
  details: (id: string) => requests.get<Product>(`/products/${id}`),
  create: (product: Product) => requests.post<void>("/products", product),
  update: (product: Product) =>
    requests.put<void>(`/products/${product.id}`, product),
  delete: (id: string) => requests.del<void>(`/products/${id}`),
};

const agent = {
  Products,
};

export default agent;
