import React, { useEffect, useState } from 'react'
import { MdOutlineHome } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import Image from '../../utils/Image';
import { getAuth, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//import { getAuth } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../../slices/userSlice';
import { Alert, Input, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from "react-icons/io";

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

const Sidebar = () => {
    const data = useSelector((state) => state.loginuserdata.value)
    const navigate = useNavigate();
    const auth = getAuth();
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

//     const defaultSrc =
//   "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";


    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
   

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      };
      const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
          setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        }
      };

      let handleImage = (e)=>{
        console.log(e);
      }

    useEffect(()=>{
        if(!data){
            navigate("/")
        }
        else{
            navigate("/home")
        }
    },[])
    
    let handleLogout = () =>{
    signOut(auth).then(()=>{
        setTimeout(()=>{

            toast.success('Logout done', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            },1000);
            localStorage.removeItem("user")
            dispatch(loginuser(null))
            navigate("/")
    })    
    }
    const userinfo = auth.currentUser;
    
    
  return (
   <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Upload Profile Photo</h2>
          <div className="img_holder">

          <Image src={data && data.photoURL} alt="img"/>
          </div>
          <input type="file" onChange={handleImage}/>
        </Box>
      </Modal>

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
    theme="light"
    />
   <div className="sidebar_box">
    <div>
        <div className="img_box">
            <Image src={data && data.photoURL} alt="img"/>
            <div onClick={handleOpen} className='overlay'>
            <IoMdCloudUpload />
            </div>
        </div>
        <h3 className='username'>{data && data.displayName}</h3>
        <div className='emaildata'>
            <p>{data && data.email}</p>
        </div>
    </div>
    <div>
        <ul className='navigation'>
            <li>
                <NavLink to="/home">
                    <MdOutlineHome />
                </NavLink>
            </li>
            <li>
                <NavLink to="/message">
                    <AiOutlineMessage />
                </NavLink>
                
            </li>
            <li>
                <NavLink to="/notification">
                    <IoNotificationsOutline />
                </NavLink>
                
            </li>
            <li>
                <NavLink to="/settings">
                    <IoSettingsOutline />
                </NavLink>
            </li>
        </ul>
    </div>
    <div>
        <button onClick={handleLogout} className='logout'>Logout</button>
    </div>
   </div>
   </>
  )
}

export default Sidebar