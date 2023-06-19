import Axios from "axios";
import React, { useEffect, useState } from "react";

import { storeAxios } from "./config";
export async function getAllProduct(page = 1) {
  let { data } = await storeAxios.get(`products?page=${page}`);
  return data.allProducts;
}

export async function getProductById(id) {
  let { data } = await storeAxios.get(`products/${id}`);
  return data;
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
    console.log(data.products);
    return data.products;
  } catch (error) {
    return [];
  }
}
/*

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhkZmYyZDhmNzJlNjQ1NjI4ODg3ZjYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODcwODUwMzB9.Su_8Tt02YvqXEflGNHKq2A_asRDySqiJn-YdfuZhrh0
*/
