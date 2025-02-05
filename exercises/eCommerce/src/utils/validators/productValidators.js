const yup = require("yup");

const addProductSchema = yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .max(255, "Name must be less than 255 characters"),
  description: yup
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .nullable(),
  price: yup
    .number()
    .integer("price must be an integer")
    .required("price is required")
    .positive("price cannot be negative")
    .min(1),
  stock: yup
    .number()
    .required("stock is required")
    .positive("stock cannot be negative")
    .default(0),
});

const updateProductSchema = yup.object().shape({
  name: yup
    .string()
    .max(255, "Name must be less than 255 characters")
    .nullable(), // Make name optional

  description: yup
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .nullable(), // Make description optional

  price: yup
    .number()
    .positive("Price cannot be negative")
    .min(1, "Price must be at least 1")
    .nullable(), // Make price optional, but ensure it's valid if provided

  stock: yup
    .number()
    .default(0) // Default to 0 if not provided
    .nullable(), // Make stock optional, but ensure it's valid if provided
});

module.exports = { addProductSchema, updateProductSchema };
