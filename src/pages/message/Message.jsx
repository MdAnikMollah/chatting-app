import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import "./message.css"
import { useSelector, useDispatch } from 'react-redux'
import Image from '../../utils/Image';
import { activeuser } from '../../slices/activeUserSlice';

const Message = () => {

  const [allMessage,setAllMessage] = useState([])
  const [messageText,setMessageText] = useState("")
  const [friendList,setFriendList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const activechat = useSelector((state) => state?.activeuserdata?.value)
  const dispatch = useDispatch()
  console.log(activechat);

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

  let handleUser = (i) =>{
   dispatch(activeuser(i)) 
  }

 //message write oparetion
  let handleSubmit = () => {
    set(push(ref(db,'message')),{
      senderid: data.uid,
      senderemail: data.email,
      sendername: data.displayName,
      message: messageText,
      recieverid: data.uid == activechat.whorecieveid ? activechat.whosendid : activechat.whorecieveid,
      recievername: data.uid == activechat.whorecieveid ? activechat.whosendname : activechat.whorecievename,
      recieveremail: data.uid == activechat.whorecieveid ? activechat.whosendemail : activechat.whorecieveemail,
    }).then(()=>{
      console.log("msg send hoise");
    })
  }

  //message read operation
  useEffect(()=>{
    const messageRef = ref(db, 'message');
    onValue(messageRef, (snapshot) => {
    let arr = []
    let activeuser = activechat.whosendid == data.uid? activechat.whorecieveid : activechat.whosendid
    snapshot.forEach((item)=>{
      if((item.val().senderid == data.uid && item.val().recieverid == activeuser) || (item.val().recieverid == data.uid && item.val().senderid == activeuser)) {
        //if(activechat.whosendid == data.uid? activechat.recieverid : activechat.senderid){
          arr.push({...item.val(),id:item.key});

        //}

      }
  })
  setAllMessage(arr)
  });

  },[activechat])

  return (
    <div className='message_wrapper'>
      <div className="message_user_body">
        <h3 className='list_heading'>Friend List</h3>
        <div className="message_user_wrapper">
          {friendList && friendList.length>0 ? friendList.map((item,index)=>(

          //<div key={index} className="message_user_item">

          //</div>
          <div onClick={()=>handleUser(item)} key={index} className='message_user_item'>
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
              {/* <button className='addbutton'>
                Message
              </button> */}
            </div>
          </div>
          ))
          :
          <h3>No friends available</h3>
          }
        </div>
      </div>
      {activechat != null ?

      <div className="message_box_body">
        <div className="message_box_heading">
          <h3>
           {activechat !== null && activechat.whosendid == data.uid
            ?
            activechat.whorecievename

            :
            activechat.whosendname 

            }  
          </h3>
          <p>Active Now</p> 
        </div>
        <div className="message_main">
          {allMessage.map((item,index)=>(
            <div key={index} className={`${item.recieverid == data.uid ? "recieve_message" : "send_message"}`}>
              <p>{item.message}</p>
            </div>
            
          ))

          }
          
          {/* <div className="recieve_message">
             <p>hello</p>
          </div>
          <div className="send_message">
             <p>I Love You</p>
          </div>
          <div className="recieve_message">
             <p>I Love You Too</p>
          </div> */}
        </div>
        <div className="message_footer">
          <input onChange={(e)=>setMessageText(e.target.value)} className='message_input' placeholder='Please Enter Your Message' />
          <button onClick={handleSubmit} className='message_send_btn'>sent</button>
        </div>
      </div>
      :
      <div>
        <h2>Please select a user</h2>
      </div>
      }
    </div>
  )
}

export default Message