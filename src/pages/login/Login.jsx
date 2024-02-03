import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./login.css";
import SectionHeading from '../../components/SectionHeading';
import GoogleSvg from '../../../public/google.svg';
import { Alert, Input, Modal, Typography } from '@mui/material';
import Inputes from '../../components/Inputes';
import CustomeButton from '../../components/CustomeButton';
import AuthNavigate from '../../components/AuthNavigate';
import LoginImg from '../../assets/images/hill.jpg';
import Image from '../../utils/image';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { getAuth, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../../slices/userSlice';

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
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  //let emailregex = (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleshowPassword = () =>{};
  //console.log(password);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  let handleModalX = () => {
    setOpen(false)
  }
  let emailregex = (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  let [formData, setFormData] = useState({
     email: "", 
     password:"" 
    })
  let [error, setError] = useState({
     email: "", 
     password:"" 
  })
  let handleLoginForm = (e) =>{
    let {name, value} = e.target
    setFormData({
      ...formData,[name]:value
    });
  };
  let handleLoginSubmit = () => {
    if(!formData.email){
      setError({email:"email nai"});
    }
    else if(!formData.email.match(emailregex)){
      setError({email:"email format thik nai"});
    }else if(!formData.password){
      setError({email:""});
      setError({password:"password nai"});
    }else{
      signInWithEmailAndPassword(auth,formData.email,formData.password).then((userCredential)=>{
        //console.log(userCredential);
        if(userCredential.user.emailVerified){
          localStorage.setItem("user",JSON.stringify(userCredential.user))
          dispatch(loginuser(userCredential.user))
          navigate("/home")
          console.log(userCredential.user);
        }else{
          signOut(auth).then(()=>{
            toast.error('Please verify your email', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
            console.log("Please verify your email");
            console.log("logout done");

          })
        }
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == "auth/invalid-credential"){
          setError({email: "email or password error"});
        }else{
          setError({email: ""});
        }
        console.log(errorCode);
        console.log(errorMessage);
      })
      setError({
        email:"",
        password:""
      })
      //console.log(formData);
    }
  }
  let [forgetformData, setforgetFormData] = useState({
    forgetemail: "",
  });
  let [forgeterror, setforgetError] = useState({
    forgetemail: "",
  });

  let handleForgetData = (e) => {
    let {name, value} = e.target
    setforgetFormData({
      ...forgetformData,[name]:value
    })
  }
  
  let handleForgetSubmit = () => {
    console.log(forgetformData);
    if(!forgetformData.forgetemail){
      setforgetError({forgetemail: "email nai"});
    }
    else if(!forgetformData.forgetemail.match(emailregex)){
      setforgetError({forgetemail: "email format thik nai"});
    }else{
      setforgetError({forgetemail: ""})
      console.log(forgetformData);
    }
  }

  return (
    <>
     <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
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
          <div>

          <Inputes type= "email" name="forgetemail" onChange={handleForgetData} labeltext={'Email Address'} varient="standard"/>
          {forgeterror.forgetemail &&(
            <Alert severity="error">{forgeterror.forgetemail}</Alert>
          )}
          </div>
          <CustomeButton onClick={handleForgetSubmit} text="Send Link" varient={"contained"}/>
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
             
              
              <div>
                <Inputes onChange={handleLoginForm}  name="email"  type="email" varient="standard" labeltext="Email Address" style="login_input_field" />
                {error.email &&(
                  <Alert severity="error">{error.email}</Alert>
                )}
              </div>
              {/*<div>
                <Inputes onChange={handleLoginForm} name="password"  type={showPassword ? 'text' : 'password'} varient="standard" labeltext="Password" style="login_input_field" />
                <button onClick={()=>setShowPassword(!showPassword)}>Show</button>
                {error.password &&
                  <Alert severity="error">{error.password}</Alert>
                } 
              </div>*/}
              {/*<div >
                <div className='passicon'>
                  <Inputes
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    varient="standard"
                    labeltext="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style="login_input_field"
                  />
                  <span onClick={handleTogglePassword} className="eye-icon">
                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </span>
                    {error.password &&(
                      <Alert severity="error">{error.password}</Alert>
                    )}
                  </div>
                    </div>*/}
                  <div>
                      <TextField
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        label="Password"
                        variant="standard"
                        fullWidth
                        value={formData.password}
                        //onChange={(e) => setPassword(e.target.value)}
                        onChange={handleLoginForm}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleTogglePassword} edge="end">
                              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                              
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {error.password &&(
                      <Alert severity="error">{error.password}</Alert>
                    )}
                  </div>
              <CustomeButton  onClick={handleLoginSubmit}   styleing="loginbtn" varient="contained" text="login to continue"/>
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
