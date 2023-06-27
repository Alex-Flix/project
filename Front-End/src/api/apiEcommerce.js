import { storeAxios } from "./config";
export async function getAllProduct(page = 1) {
  try {
    let check = await storeAxios.get(`products?page=${page}`);
    console.log(check);
    return check?.data || { allProducts: [], totalPages: 0 };
  } catch (error) {
    return error;
  }
}

export async function getProductById(id) {
  try {
    let check = await storeAxios.get(`products/${id}`);
    console.log(check?.data || {});
    return check?.data || {};
  } catch (error) {
    return error;
  }
}

export async function searchProduct(query) {
  try {
    let { data } = await storeAxios.get(
      `products/search?name=${query.movie}&minPrice=${
        query.minPrice
      }&maxPrice=${query.maxPrice === "max" ? "" : query.maxPrice}&category=${
        query.category
      }`
    );
    return data.products;
  } catch (error) {
    return error;
  }
}
