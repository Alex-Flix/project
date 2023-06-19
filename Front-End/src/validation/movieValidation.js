import * as yup from "yup";

export const movieCategories = [
  { value: "Action", label: "Action" },
  { value: "Adventure", label: "Adventure" },
  { value: "Animation", label: "Animation" },
  { value: "Comedy", label: "Comedy" },
  { value: "Crime", label: "Crime" },
  { value: "Documentary", label: "Documentary" },
  { value: "Drama", label: "Drama" },
  { value: "Family", label: "Family" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "History", label: "History" },
  { value: "Horror", label: "Horror" },
  { value: "Musical", label: "Musical" },
  { value: "Mystery", label: "Mystery" },
  { value: "Romance", label: "Romance" },
  { value: "Sci-Fi", label: "Sci-Fi" },
  { value: "Sport", label: "Sport" },
  { value: "Thriller", label: "Thriller" },
  { value: "War", label: "War" },
  { value: "Western", label: "Western" },
];
const currentYear = new Date().getFullYear();

export const name = yup.string().required("name should be String");
export const rate = yup
  .number()
  .required("Rating is required")
  .min(1, "Rating must be at least 1")
  .max(5, "Rating cannot exceed 5");
export const type = yup.string().required("type should be String");
export const production_year = 
yup.number().required('production_year is required').integer().min(1878).max(currentYear);

export const trailer = yup
  .string()
  .url("trailer must be a valid URL")
  .required("trailer should be String");
export const poster = yup
  .string()
  .url("Poster must be a valid URL")
  .required("Poster URL is required");
export const videos = yup
  .string()
  .url("videos must be a valid URL")
  .required("videos should be String");
  export const description = yup
  .string()
  .required("Description must be a string")
  .min(5, "Description must be at least 5 characters long");
