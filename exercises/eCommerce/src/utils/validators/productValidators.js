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
  category_id: yup
    .number()
    .required("category_id is required")
    .positive("category_id cannot be negative"),
});

const updateProductSchema = yup.object().shape({
  name: yup
    .string()
    .max(255, "Name must be less than 255 characters")
    .nullable(),

  description: yup
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .nullable(),

  price: yup
    .number()
    .positive("Price cannot be negative")
    .min(1, "Price must be at least 1")
    .nullable(),

  stock: yup.number().default(0).nullable(),

  category_id: yup.number().positive().nullable(),
});

module.exports = { addProductSchema, updateProductSchema };
