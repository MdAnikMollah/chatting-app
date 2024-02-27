import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utils/Image'
import { FaPlus } from 'react-icons/fa'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
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
      if(data.uid == item.val().whorecieveid || data.uid == item.val().whosendid){
        arr.push({...item.val(),id:item.key});

      }
  })
  setFriendList(arr)
  });

  },[])

let handleBlock = (blockinfo) => {
console.log(blockinfo);
set(push(ref(db,'block')),{
  whoblockid: data.uid,
  whoblockname: data.displayName,
  whoblockemail: data.email,
  whoblockimg: data.photoURL,
  blockid: blockinfo.whorecieveid,
  blockemail: blockinfo.whorecieveemail,
  blockname: blockinfo.whorecievename,
  blockimg: blockinfo.whorecievephoto,
}).then(()=>{
  remove(ref(db, "friends/"+blockinfo.id))
})
}

  return (
    <>
    <GroupCard cardtitle="Friends"> 
        <div className='usermainbox'>
          {friendList && friendList.map((item,index)=>(
          <div key={index} className='useritem'>
            <div className="userimgbox">
              <Image src={data.uid == item.whosendid ? item.whorecievephoto : item.whosendphoto} alt="img"/>
            </div>
            <div className='userinfobox'>
              <div>
                {data.uid == item.whosendid
                ?
                <h3>{item.whorecievename}</h3>
                :
                <h3>{item.whosendname}</h3>
                }
                <p>MERN developer</p>
              </div>
              <button  onClick={()=>handleBlock(item)} className='addbutton'>
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