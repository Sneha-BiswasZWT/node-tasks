const yup= require('yup');

const createUserValidate = yup.object().shape({
    name: yup.string().required("name is required"),
    age: yup.number("enter a valid age").required("age is required").positive().integer().min(18).max(115),
    email: yup.string().email("Invalid email format").required("email is required"),
    role: yup
    .string()
    .oneOf(["admin", "user"], "Role must be either 'admin' or 'user'")
    .required("Role is a required field"),
  isActive: yup.boolean().nullable().default(false)
});

const updateUserValidate = yup.object().shape({
    name: yup.string().optional(),
    age: yup.number("enter a valid age").positive().integer().min(18).max(115).optional(),
    email: yup.string().email("Invalid email format").optional(),
    role: yup
    .string()
    .oneOf(["admin", "user"], "Role must be either 'admin' or 'user'").optional(),
    isActive: yup.boolean().nullable().default(false).optional()
});

const idSchema = yup.object().shape({
    id: yup
      .number()
      .required('ID is required')
      .positive('ID must be a positive number')
      .integer('ID must be an integer')
  });

module.exports = {
    createUserValidate,
    updateUserValidate,
    idSchema
  };