import { Alert, Box, Grid } from '@mui/material'
import SectionHeading from '../../components/SectionHeading'
import Inputes from '../../components/Inputes'
import CustomeButton from '../../components/CustomeButton'
import AuthNavigate from '../../components/AuthNavigate'
import React, { useState } from 'react';
import Image from '../../utils/image';
import RegImg from '../../assets/images/sea.jpg';
import { TextField, IconButton, InputAdornment } from '@mui/material';




const Registration = () => {
  {/*const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
   
    setShowPassword(!showPassword);
  };*/}
 let [error,setError]= useState({
  email:"",
  fullname:"",
  password:""
 })
 let [singupData,setSingupData] = useState({
  email:"",
  fullname:"",
  password:""
 }) 
 let handleSubmit =() =>{
  if (!singupData.email) {
    setError({email:"email nai"});
  }else if(!singupData.email.match(emailregex)){
    setError({email:"email format thik nai"});
   
    
    //console.log("format");
    // if(emailregex.test(singupData.email)){
    //   console.log("thik ase");
    // }else{
    //   console.log("thik nai");
    // }
      
    
  }
  else if(!singupData.fullname){
    setError({email:""});
    setError({fullname:"name nai"});
  }else if(!singupData.password){
    setError({fullname:""});
    setError({password:"password nai"});
  }else{
    setError({
      email:"",
      fullname:"",
      password:""
    })
    console.log(singupData);
  }

 }
 let handleForm =(e) => {
  let {name,value} = e.target
  setSingupData({
    ...singupData,[name]:value
  })
 }
 let emailregex = (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  
  return (
    <>
  <Box>
    <Grid container spacing={0}>
      <Grid item xs={6}>
        <div className="loginbox">
         <div className='loginbox_inner'>
           <SectionHeading style="auth_heading" text="Get started with easily register"/>
          
           <div className='form_main'>
          
            <div>
              <Inputes onChange={handleForm} name="email"  type="email" varient="outlined" labeltext="Email Address" style="login_input_field"/>
              {error.email &&
              <Alert severity="error">{error.email}</Alert>
              }
              </div>
            <div>
              <Inputes onChange={handleForm} name="fullname"  type="text" varient="outlined" labeltext="FullName" style="login_input_field"/>
              {error.fullname &&
              <Alert severity="error">{error.fullname}</Alert>
              }
            </div>
            <div>
              <Inputes onChange={handleForm} name="password"  type="password" varient="outlined" labeltext="Password" style="login_input_field"/>
              {error.password &&
              <Alert severity="error">{error.password}</Alert>
              }
            </div>
            <div >
               {/* <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                        
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />*/}
              </div>
             
            
            <CustomeButton onClick={handleSubmit}  styleing="loginbtn" varient="contained" text="sing up"/>
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