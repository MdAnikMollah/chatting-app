import React from 'react'
import { MdOutlineHome } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import Image from '../../utils/image';

const Sidebar = () => {
  return (
   <>
   <div className="sidebar_box">
    <div>
        <div className="img_box">
            <Image src="" alt="img"/>
        </div>
        <h3 className='username'>Anik</h3>
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
        <button className='logout'>Logout</button>
    </div>
   </div>
   </>
  )
}

export default Sidebar