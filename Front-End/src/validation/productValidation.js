import * as yup from "yup";
export const validCategories = ["T-shirt", "Mug","Accessories"];

export const name = yup.string().required("Name must be a string");
export const price = yup
  .number()
  .required("Price must be a number")
  .positive("Price must be greater than zero")
  .moreThan(49.99, 'Price must be at least 50');
  
export const description = yup
  .string()
  .required("Description must be a string")
  .min(5, "Description must be at least 5 characters long");
export const available = yup
  .number()
  .required("Available must be a number")
  .min(1, "Available must be at least 1");
export const category = yup
  .string()
  .required(`Category is required`)
  .test("valid-category", "Invalid category", (value) =>
    validCategories.includes(value)
  );

