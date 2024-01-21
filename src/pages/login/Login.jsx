import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./login.css";
import SectionHeading from '../../components/SectionHeading';
import GoogleSvg from '../../../public/google.svg';
import { Input, Modal, Typography } from '@mui/material';
import Inputes from '../../components/Inputes';
import CustomeButton from '../../components/CustomeButton';
import AuthNavigate from '../../components/AuthNavigate';
import LoginImg from '../../assets/images/hill.jpg';
import Image from '../../utils/image';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { validation } from "../../validation/Formvalidation";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: 'red',
    borderWidth: 5,
  },
  '& input:invalid + fieldset': {
    borderColor: '#E0E3E7',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important', // override inline-style
  },
});

const Login = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleModalX = () => {
    setOpen(false)
  }
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style}>
        <div className="modal_btn">
        <button onClick={handleModalX}>X</button>
        </div>
        <div className='forgot_box'>
          <h2>Forgot Password</h2>
          <Inputes type= "email" labeltext={'Email Address'} varient="standard"></Inputes>
          <CustomeButton text="Send Link" varient={"contained"}/>
        </div>
        </Box>
      
    </Modal>
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className="loginbox">
           <div className='loginbox_inner'>
             <SectionHeading style="auth_heading" text="Login to your account"/>
             <div className="provider_login">
                <img src={GoogleSvg}/>
                <span>Login with Google</span>
             </div>
             <div className='form_main'>
              <form method="post" onSubmit={formik.handleSubmit}/>
              
              <div>
                <Inputes name="email" type="email" varient="standard" labeltext="Email Address" style="login_input_field" onChange={formik.handleChange} value={formik.values.email}/>
                {formik.touched.email && formik.errors.email ? (
                <div className='error'>{formik.errors.email}</div>
                 ) : null}
              </div>
              <div >
                <div className='passicon'>
                  <Inputes
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    varient="standard"
                    labeltext="Password"
                    //value={password}
                    value={formik.values.password}
                    onChange={(e) => setPassword(e.target.value) (formik.handleChange)}
                    style="login_input_field"
                  />
                  <span onClick={handleTogglePassword} className="eye-icon">
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                    {formik.touched.password && formik.errors.password ? (
                    <div className='error'>{formik.errors.password}</div>
                    ) : null}
                  </span>
                </div>
              </div>
              <CustomeButton styleing="loginbtn" varient="contained" text="login to continue"/>
             </div>
              <AuthNavigate style="loginauth" link="/registration" linktext="sign up" text="Don’t have an account ?"/>
              {/*<AuthNavigate style="loginauth" linktext="Forget Password"  text="Are you sure reset your password ?"/>*/}
              <p className='loginauth'>Are you sure reset your password?
              <span onClick={handleOpen}>Forget Password</span>
              </p>
           </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="loginimg">
            <Image src={LoginImg} alt="img"/>
          </div>
        </Grid>
      </Grid>
    </Box>
   
    </>
  );
};

export default Login;
