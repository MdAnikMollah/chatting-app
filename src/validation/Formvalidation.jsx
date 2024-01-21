import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


export  const validation = Yup.object({
   fullname: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .min(5, 'Must be 5 characters or above')
           .required("Full name missing"),
   email:  Yup.string()
           .email('Invalid email address')
           .matches(emailRegex, "Invalid email address")
           .required("email missing"),
           
   password: Yup.string()
             .matches(passwordRegex, "Password must contain at least 8 characters,one uppercase, one number and one special case character")
             .required("password missing"),
})