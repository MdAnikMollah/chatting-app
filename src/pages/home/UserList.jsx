import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utils/Image';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

const UserList = () => {
  const [userList,setUserList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const [fRequest,setfRequst] = useState([])
  const [friendList,setFriendList] = useState([])
  const [requestcheak,setRequestCheak] = useState([])

  //console.log(data.uid);
  
  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item)=>{
      if(data.uid != item.key){
        arr.push({...item.val(),id:item.key});

      }
  })
  setUserList(arr)
  });

  },[])
let handleFRequest = (frequestinfo) => {
set(ref(db,"friendrequest/" + frequestinfo.id),{
  senderid: data.uid,
  sendername: data.displayName,
  senderimg: data.photoURL,
  senderemail: data.email,
  receiverid: frequestinfo.id,
  receivername: frequestinfo.username,
  receiveremail: frequestinfo.email,
  receiverimg: frequestinfo.profileImg
}).then(()=>{
  // toast.success('Friend request send successfully.....', {
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
useEffect(()=>{
  const fRequestRef = ref(db, 'friendrequest');
  onValue(fRequestRef, (snapshot) => {
  let arr = []
  let xyz = []
  snapshot.forEach((item)=>{
    if(item.val().receiverid == data.uid){
      xyz.push(item.val().senderid + item.val().receiverid)

    }
    if(data.uid == item.val().senderid){
       arr.push((item.val().senderid + item.val().receiverid));

     }
 })
 setfRequst(arr)
 setRequestCheak(xyz)
});
},[])

useEffect(()=>{
  const friendsRef = ref(db, 'friends');
  onValue(friendsRef, (snapshot) => {
  let arr = []
  snapshot.forEach((item)=>{
    if(item.val().whorecieveid == data.uid || item.val().whosendid == data.uid){
      arr.push(item.val().whorecieveid + item.val().whosendid)
    }
 })
 setFriendList(arr)
});
},[])
//console.log(setFriendList);

//console.log(fRequest);
console.log(setRequestCheak);
let handleCancle = (i)=>{
  //console.log(i.id);
  remove(ref(db,"friendrequest/" + i.id)).then(()=>{
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
  />

  <ToastContainer /> */}
   <GroupCard cardtitle="User List"> 
        <div className='usermainbox'>
        {userList && userList.length > 0
        ?
        userList.map((item,index)=>(
          
        <div key={index} className='useritem'>
          <div className="userimgbox">
            <Image src={item.profileImg} alt="img"/>
          </div>
          <div className='userinfobox'>
            <div>
              <h3>{item.username}</h3> 
              <p>MERN developer</p>
            </div>
            {
              fRequest.length > 0 && fRequest.includes(item.id + data.uid) || fRequest.includes(data.uid + item.id)
            ?
            <>
            <button className='addbutton'>pending</button>
            <button onClick={()=>handleCancle(item)} className='addbutton'>cancle</button>
            
            </>
            :
            friendList.includes(item.id + data.uid) || friendList.includes(data.uid + item.id)
            ?
            <button className='addbutton'>friend</button>
            :
            requestcheak.includes(item.id + data.uid)
            ?
            <button className='addbutton'>confirm</button>
             
            :
            <button onClick={()=>handleFRequest(item)} className='addbutton'>
               add
             </button>
            } 
          </div>
        </div>
        ))
        :
        <h2>No user available</h2>
        }
          
        </div>
      </GroupCard>
   </>
  )
}

export default UserList