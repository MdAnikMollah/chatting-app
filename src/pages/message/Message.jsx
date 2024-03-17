import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import "./message.css"
import { useSelector, useDispatch } from 'react-redux'
import Image from '../../utils/Image';
const Message = () => {

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

  let handleUser = (i) =>{
    console.log(i);
  }
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
      <div className="message_box_body">
        <div className="message_box_heading">
          <h3>Jannat</h3>
          <p>Active Now</p> 
        </div>
        <div className="message_main">
          <div className="send_message">
             <p>hello</p>
          </div>
          <div className="recieve_message">
             <p>hello</p>
          </div>
          <div className="send_message">
             <p>I Love You</p>
          </div>
          <div className="recieve_message">
             <p>I Love You Too</p>
          </div>
        </div>
        <div className="message_footer">
          <input placeholder='Please Enter Your Message' />
        </div>
      </div>
    </div>
  )
}

export default Message