import React from 'react'
import { MdOutlineHome } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import Image from '../../utils/image';
import { getAuth, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
//import { getAuth } from "firebase/auth";

const Sidebar = () => {
    const navigate = useNavigate();
    const auth = getAuth();
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
            navigate("/")
    })    
    }
    const userinfo = auth.currentUser;
    console.log(userinfo.displayName);
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
    theme="light"
    />
   <div className="sidebar_box">
    <div>
        <div className="img_box">
            <Image src={userinfo && userinfo.photoURL} alt="img"/>
        </div>
        <h3 className='username'>{userinfo && userinfo.displayName}</h3>
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