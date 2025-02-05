const yup = require("yup");

// Regular expressions for social media URLs
const linkedInRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+$/;
const facebookRegex = /^https:\/\/(www\.)facebook\.com\/[a-zA-Z0-9.]+$/;
const instagramRegex = /^https:\/\/(www\.)instagram\.com\/[a-zA-Z0-9_.]+$/;

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
  role: yup
    .string()
    .oneOf(["admin", "user"], "Role must be either 'admin' or 'user'")
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
    .oneOf(["admin", "user"], "Role must be either 'admin' or 'user'")
    .optional(),
});

const UserProfileSchema = yup.object().shape({
  // userId: yup.unique(),
  bio: yup.string().optional().nullable(),
  linkedInUrl: yup
    .string()
    .matches(
      linkedInRegex,
      "Invalid LinkedIn profile URL. Example: https://www.linkedin.com/in/your-profile"
    )
    .optional(),
  facebookUrl: yup
    .string()
    .matches(
      facebookRegex,
      "Invalid Facebook profile URL. Example: https://www.facebook.com/your-profile"
    )
    .optional(),
  instaUrl: yup
    .string()
    .matches(
      instagramRegex,
      "Invalid Instagram profile URL. Example:  https://www.instagram.com/your-profile"
    )
    .optional(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  UserProfileSchema,
};
