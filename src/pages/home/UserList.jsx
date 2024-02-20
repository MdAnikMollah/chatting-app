import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import { FaPlus } from 'react-icons/fa'
import Image from '../../utils/image';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
const UserList = () => {
  const [userList,setUserList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  console.log(data);
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
console.log(frequestinfo);
set(push(ref(db,"friendrequest")),{
  senderid: data.uid,
  sendername: data.displayName,
  senderimg: data.photoURL,
  senderemail: data.email,
  receiverid: frequestinfo.id,
  receivername: frequestinfo.username,
  receiveremail: frequestinfo.email,
  receiverimg: frequestinfo.profileImg
})
}

  return (
   <>
   <GroupCard cardtitle="User List"> 
        <div className='usermainbox'>
        {userList && userList.length > 0
        ?
        userList.map((item,index)=>
          
        <div key={index} className='useritem'>
          <div className="userimgbox">
            <Image src={item.profileImg} alt="img"/>
          </div>
          <div className='userinfobox'>
            <div>
              <h3>{item.username}</h3>
              <p>MERN developer</p>
            </div>
            <button onClick={()=>handleFRequest(item)} className='addbutton'>
              <FaPlus />
            </button>
          </div>
        </div>
        )
        :
        <h2>No user available</h2>
        }
          
        </div>
      </GroupCard>
   </>
  )
}

export default UserList