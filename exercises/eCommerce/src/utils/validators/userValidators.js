const yup = require("yup");

const createUserSchema = yup.object().shape({
  first_name: yup.string().required("firstname is required"),
  last_name: yup.string().required(" last name is required"),
  age: yup
    .number("enter a valid age")
    .required("age is required")
    .positive()
    .integer()
    .min(18)
    .max(115),
  email: yup
    .string()
    .email("Invalid email format")
    .required("email is required"),
  password: yup.string().required("password is required"),
  role: yup
    .string()
    .oneOf(["admin", "customer"], "Role must be either 'admin' or 'customer'")
    .required("Role is a required field"),
});

const updateUserSchema = yup.object().shape({
  first_name: yup.string().optional(),
  last_name: yup.string().optional(),
  age: yup
    .number("enter a valid age")
    .positive()
    .integer()
    .min(18)
    .max(115)
    .optional(),
  email: yup.string().email("Invalid email format").optional(),
  role: yup
    .string()
    .oneOf(["admin", "customer"], "Role must be either 'admin' or 'customer'")
    .optional(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
