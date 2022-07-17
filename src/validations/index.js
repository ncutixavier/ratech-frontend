import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().required("Password is required"),
});

export const recoverPasswordSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  code: Yup.string().required("Code is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const searchSchema = Yup.object().shape({
  search: Yup.string().required(""),
})
