const yup = require("yup");

const addToCartSchema = yup.object().shape({
  product_id: yup.number().required("product_id is required"),
  quantity: yup
    .number("quantity must be an number")
    .required("quantity is required")
    .min(1),
});

module.exports = { addToCartSchema };
