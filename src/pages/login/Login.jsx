import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./login.css";
import SectionHeading from '../../components/SectionHeading';
import GoogleSvg from '../../../public/google.svg';
import { Input } from '@mui/material';
import Inputes from '../../components/Inputes';
import CustomeButton from '../../components/CustomeButton';
import AuthNavigate from '../../components/AuthNavigate';
import LoginImg from '../../assets/images/hill.jpg';
import Image from '../../utils/image';

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
  let [password, setPassword] = useState('');
  let [showPassword, setShowPassword] = useState(false);

  let handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
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
                <Inputes name="email" type="email" varient="standard" labeltext="Email Address" style="login_input_field"/>
              </div>
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
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
              <CustomeButton styleing="loginbtn" varient="contained" text="login to continue"/>
             </div>
              <AuthNavigate style="loginauth" link="/registration" linktext="sign up" text="Don’t have an account ?"/>
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
