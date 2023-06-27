import { configAxios } from "./config.js";

export const getAllProducts = async (page) => {
  try {
    const check = await configAxios.get(`products/?page=${page}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const searchProduct = async (obj) => {
  try {
    const check = await configAxios.get(
      `products/search/?name=${obj.name ? obj.name : ""}&category=${
        obj.category ? obj.category : ""
      }`
    );
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const createProduct = async (data) => {
  try {
    const check = await configAxios.post("products", data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const updateProductById = async (id, data) => {
  try {
    const check = await configAxios.patch(`products/${id}`, data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const deleteProductById = async (id) => {
  try {
    const check = await configAxios.delete(`products/${id}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};
