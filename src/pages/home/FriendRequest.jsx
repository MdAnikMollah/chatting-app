import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utils/Image';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const FriendRequest = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const [fRequest,setfRequst] = useState()

  useEffect(()=>{
    const fRequestRef = ref(db, 'friendrequest');
    onValue(fRequestRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item)=>{
      if(data.uid == item.val().receiverid){
         arr.push({...item.val(),id:item.key});
  
       }
   })
   setfRequst(arr)
  });
  
  
  },[])
let handleacceptFrequest = (acceptinfo)=>{
  console.log(acceptinfo);
  set(push(ref(db,"friends")),{
   whosendname: acceptinfo.sendername,
   whosendid: acceptinfo.senderid,
   whosendemail: acceptinfo.senderemail,
   whosendphoto: acceptinfo.senderimg,
   whorecievename: data.displayName,
   whorecieveid: data.uid,
   whorecieveemail: data.email,
   whorecievephoto: data.photoURL

  }).then(()=>{
    remove(ref(db,"friendrequest/" + acceptinfo.id))
    // toast.success('Friend request accepted successfully.....', {
    //   position: "top-right",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   });
  })
}
let handlecancleFrequest = (cancleinfo)=>{
  console.log(cancleinfo);
  remove(ref(db,"friendrequest/" + cancleinfo.id)).then(()=>{
    // toast.error('cancle done....', {
    //   position: "top-right",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
      
    //   });
  })
}
  return (
    <>
    {/* <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"

    /> */}
    <GroupCard cardtitle="Friend Request"> 
        <div className='usermainbox'>
          {fRequest && fRequest.length > 0 ?
          fRequest.map((item,index)=>(
          <div key={index} className='useritem'>
            <div className="userimgbox">
              <Image src={item.senderimg} alt="img"/>
            </div>
            <div className='userinfobox'>
              <div>
                <h3>{item.sendername}</h3>
                <p>MERN developer</p>
              </div>
              <div>
                <div className="buttongroup">
                  <button  onClick={()=>handleacceptFrequest(item)} className='addbutton'>
                    Accept
                  </button>
                  <button onClick={()=>handlecancleFrequest(item)} className='addbutton'>
                    Cancle
                  </button>

                </div>

              </div>
            </div>
          </div>

          ))
          :
          <h2>No Request Found....</h2>
          }
        </div>
  </GroupCard> 
    </>
  )
}

export default FriendRequest