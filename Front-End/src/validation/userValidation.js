import * as yup from "yup";

const minAge = 18;
const maxAge = 40;

export const firstName = yup
  .string()
  .required("First name is required")
  .min(2, "First name must be at least 2 characters long");

export const lastName = yup
  .string()
  .required("Last name is required")
  .min(2, "Last name must be at least 2 characters long");

export const email = yup
  .string()
  .required("Email is required")
  .email("Invalid email address");
export const password = yup
  .string()
  .required("Password is required")
  .min(5, "Password must be at least 5 characters long")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*])[a-zA-Z\d!@#$%&*]{5,}$/,
    "Password must contain an uppercase letter, a lowercase letter, a number, and one of the special characters"
  );

export const confirmPassword = yup
  .string()
  .required("Confirm Password is required")
  .oneOf([yup.ref("password"), null], "Passwords must match");

export const phone = yup
  .string()
  .required("Phone number is required")
  .matches(/^[0-9]{11}$/, "Invalid phone number")
  .test(
    "is-equal",
    "Phone number must have 11 digits",
    (value) => value && value.length === 11
  );
export const gender = yup.string().required("Gender is required");
export const age = yup
  .number()
  .required("Age is required")
  .integer("Age must be a number")
  .min(minAge, `Age must be between ${minAge} and ${maxAge}`)
  .max(maxAge, `Age must be between ${minAge} and ${maxAge}`);
