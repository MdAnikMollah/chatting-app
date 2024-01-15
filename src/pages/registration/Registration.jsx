import { Box, Grid } from '@mui/material'
import SectionHeading from '../../components/SectionHeading'
import Inputes from '../../components/Inputes'
import CustomeButton from '../../components/CustomeButton'
import AuthNavigate from '../../components/AuthNavigate'
import React, { useState } from 'react';
import Image from '../../utils/image';
import RegImg from '../../assets/images/sea.jpg';



const Registration = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
   
    setShowPassword(!showPassword);
  };
  return (
    <Box>
    <Grid container spacing={0}>
      <Grid item xs={6}>
        <div className="loginbox">
         <div className='loginbox_inner'>
           <SectionHeading style="auth_heading" text="Get started with easily register"/>
          
           <div className='form_main'>
            <div>
              <Inputes name="email" type="email" varient="outlined" labeltext="Email Address" style="login_input_field"/>
            </div>
            <div>
              <Inputes name="full name" type="text" varient="outlined" labeltext="Full Name" style="login_input_field"/>
            </div>
            <div className='passicon'>
                <Inputes
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  varient="outlined"
                  labeltext="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style="login_input_field"
                />
                <span onClick={handleTogglePassword} className="eye-icon">
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
            
            <CustomeButton styleing="loginbtn" varient="contained" text="sing up"/>
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
  )
}

export default Registration