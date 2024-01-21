import { Box, Grid } from '@mui/material'
import SectionHeading from '../../components/SectionHeading'
import Inputes from '../../components/Inputes'
import CustomeButton from '../../components/CustomeButton'
import AuthNavigate from '../../components/AuthNavigate'
import React, { useState } from 'react';
import Image from '../../utils/image';
import RegImg from '../../assets/images/sea.jpg';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { validation } from "../../validation/Formvalidation";


const Registration = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
   
    setShowPassword(!showPassword);
  };
  const initialValues = {
    
    fullname: "",
    email: "",
    password:"",
}
const formik = useFormik({
  initialValues:initialValues,
  validationSchema : validation, 
  onSubmit: (values,action) => {
  console.log(values);
  action.resetForm()
  }
})
  
  return (
    <>
  <Box>
    <Grid container spacing={0}>
      <Grid item xs={6}>
        <div className="loginbox">
         <div className='loginbox_inner'>
           <SectionHeading style="auth_heading" text="Get started with easily register"/>
          
           <div className='form_main'>
           <form method="post" onSubmit={formik.handleSubmit}/>
            <div>
              <Inputes name="email" type="email" varient="outlined" labeltext="Email Address" style="login_input_field" onChange={formik.handleChange} value={formik.values.email}/>
              {formik.touched.email && formik.errors.email ? (
              <div className='error'>{formik.errors.email}</div>
              ) : null}
              </div>
            <div>
              <Inputes name="fullname" type="text" varient="outlined" labeltext="FullName" style="login_input_field" onChange={formik.handleChange} value={formik.values.fullname}/>
              {formik.touched.fullname && formik.errors.fullname ? (
            <div className='error'>{formik.errors.fullname}</div>
            ) : null}
            </div>
            <div >
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={formik.values.password}
                  onChange={(e) => setPassword(e.target.value)(formik.handleChange)}
                  
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                        {formik.touched.password && formik.errors.password ? (
                          <div className='error'>{formik.errors.password}</div>
                          ) : null}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
             
            
            <CustomeButton  styleing="loginbtn" varient="contained" text="sing up"/>
           </div>
            <AuthNavigate style="loginauth" link="/" linktext="sign in" text="Already  have an account ?"/>
         </div>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className="loginimg">
          <Image src={RegImg} alt="img"/>
        </div>
      </Grid>
    </Grid>
  </Box>
  
</>
  )
}

export default Registration