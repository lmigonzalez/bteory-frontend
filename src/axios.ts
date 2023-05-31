
import axios, { type AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {baseURL: "http://pools-cosmetics.up.railway.app/api"}
const instance = axios.create(config);

export const getCategories = async () => {
  const res = await instance.get('/get-categories');
};

export const createCategory = () => {
  return instance.post("/create-category");
};

export const deleteCategory = () => {
  return instance.delete("/delete-category");  
};

export const getProducts = async() => {
  const res = await instance.get("/get-products");
};
