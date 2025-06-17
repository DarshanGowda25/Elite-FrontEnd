import * as Yup from 'yup';
import Category from '../Store/Category';
import { Descriptions } from 'antd';

// Calculate date 13 years ago for DOB validation
const thirteenYearsAgo = new Date();
thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);

export const UserLoginValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email!")
    .required("Email required!"),
    password: Yup.string().required("Password required!")
});

export const UserSignUpValidation = Yup.object().shape({
    name: Yup.string().required("UserName required!"),
    email: Yup.string().email("Invalid email!").required("Email required!"),
    phone: Yup.string()
        .required("Phone no Required!")
        .matches(/^\d{10}$/, "Phone no Should be exactly 10 digits"),
    DOB: Yup.date()
        .required("Date of Birth required!")
        .max(thirteenYearsAgo, "You must be at least 13 years old"),

    gender: Yup.string().required("Gender required!"),
    address: Yup.string().required("Address required!"),
    password: Yup.string()
        .required("Password required")
        .min(6, "Password must be at least 6 characters"),
    Cpassword: Yup.string()
        .required("Confirm Password required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
});


export const addressValidation = Yup.object().shape({
    name:Yup.string().required("name required"),
    email: Yup.string().email("invalid email!").required("email required!"),
    phone: Yup.string()
        .required("phone no required!")
        .matches(/^\d{10}$/, "Phone no Should be exactly 10 digits"),
    address:Yup.string().required(" required"),
    town:Yup.string().required('required'),
    pincode:Yup.string().required('required').matches(/^\d{6}$/, "invalid"),
    district:Yup.string().required(' required')
});



export const productValidation = Yup.object().shape({
  name: Yup.string().required("Product name required"),
  category: Yup.string().required("Category required"),
  description: Yup.string().required("Description required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price required")
    .min(0, "Price must be a positive number"),
  discount: Yup.number()
    .typeError("Discount must be a number")
    .required("Discount required")
    .min(0, "Discount cannot be less than 0%")
    .max(100, "Discount cannot be more than 100%"),
  image: Yup.string().required("Provide image link"),
});




export const updateProductValidation = Yup.object().shape({

  
  name: Yup.string().required('Product name is required'),

  available: Yup.number()
    .oneOf([0, 1], 'Select a valid availability')
    .required('Availability is required'),

  description: Yup.string().trim()
    .min(5, 'Description must be at least 5 characters')
    .max(500, 'Description must be at most 500 characters')
    .required('Description is required'),

  price: Yup.number().typeError('Price must be a number')
    .min(1, 'Price must be greater than 0')
    .required('Price is required'),

  discount: Yup.number().typeError('Discount must be a number')
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100%')
    .required('Discount is required'),
});
