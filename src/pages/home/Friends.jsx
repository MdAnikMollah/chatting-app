import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utils/Image'
import { FaPlus } from 'react-icons/fa'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

const Friends = () => {
  const [friendList,setFriendList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)

  useEffect(()=>{
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item)=>{
      if(data.uid == item.val().whorecieveid){
        arr.push({...item.val(),id:item.key});

      }
  })
  setFriendList(arr)
  });

  },[])
  return (
    <>
    <GroupCard cardtitle="Friends"> 
        <div className='usermainbox'>
          {friendList && friendList.map((item,index)=>(
          <div key={index} className='useritem'>
            <div className="userimgbox">
              <Image src={item.whosendphoto} alt="img"/>
            </div>
            <div className='userinfobox'>
              <div>
                <h3>{item.whosendname}</h3>
                <p>MERN developer</p>
              </div>
              <button className='addbutton'>
                Block
              </button>
            </div>
          </div>


          ))

          }
        </div>
  </GroupCard> 
    </>
  )
}

export default Friends