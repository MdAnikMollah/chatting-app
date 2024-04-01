import React, { useEffect, useState, useRef } from 'react';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';
import './message.css';
import { useSelector, useDispatch } from 'react-redux';
import Image from '../../utils/Image';
import { activeuser } from '../../slices/activeUserSlice';
import EmojiPicker from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Message = () => {
  const [allMessage, setAllMessage] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false); // State to track emoji picker visibility
  const [friendList, setFriendList] = useState();
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value);
  const activechat = useSelector((state) => state?.activeuserdata?.value);
  const dispatch = useDispatch();
  const emojiRef = useRef();

  useEffect(() => {
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().whorecieveid || data.uid === item.val().whosendid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendList(arr);
    });
  }, []);

  let handleUser = (i) => {
    dispatch(activeuser(i));
  };

  let handleSubmit = () => {
    set(push(ref(db, 'message')),{
        senderid: data.uid,
        senderemail: data.email,
        sendername: data.displayName,
        message: messageText,
        recieverid: data.uid === activechat.whorecieveid ? activechat.whosendid : activechat.whorecieveid,
        recievername: data.uid === activechat.whorecieveid ? activechat.whosendname : activechat.whorecievename,
        recieveremail: data.uid === activechat.whorecieveid ? activechat.whosendemail : activechat.whorecieveemail,
      }).then(()=>{
        setMessageText('') 
      })  
    ;
  };

  useEffect(() => {
    const messageRef = ref(db, 'message');
    onValue(messageRef, (snapshot) => {
      let arr = [];
      let activeuser = activechat.whosendid === data.uid ? activechat.whorecieveid : activechat.whosendid;
      snapshot.forEach((item) => {
        if (
          (item.val().senderid === data.uid && item.val().recieverid === activeuser) ||
          (item.val().recieverid === data.uid && item.val().senderid === activeuser)
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setAllMessage(arr);
    });
  }, [activechat]);

  let handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  let handleEmojiPic = (e) => {
    setMessageText(messageText + e.emoji);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="message_wrapper">
      <div className="message_user_body">
        <h3 className="list_heading">Friend List</h3>
        <div className="message_user_wrapper">
          {friendList && friendList.length > 0 ? (
            friendList.map((item, index) => (
              <div onClick={() => handleUser(item)} key={index} className="message_user_item">
                <div className="userimgbox">
                  <Image src={data.uid === item.whosendid ? item.whorecievephoto : item.whosendphoto} alt="img" />
                </div>
                <div className="userinfobox">
                  <div>
                    {data.uid === item.whosendid ? <h3>{item.whorecievename}</h3> : <h3>{item.whosendname}</h3>}
                    <p>MERN developer</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3>No friends available</h3>
          )}
        </div>
      </div>
      {activechat != null ? (
        <div className="message_box_body">
          <div className="message_box_heading">
            <h3>{activechat !== null && activechat.whosendid === data.uid ? activechat.whorecievename : activechat.whosendname}</h3>
            <p>Active Now</p>
          </div>
          <ScrollToBottom className="scrollbox">
            <div className="message_main">
              {allMessage.map((item, index) => (
                <div key={index} className={`${item.recieverid === data.uid ? 'recieve_message' : 'send_message'}`}>
                  <p>{item.message}</p>
                </div>
              ))}
            </div>
          </ScrollToBottom>
          <div className="message_footer">
            <input
              onKeyUp={handleKeyPress}
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
              className="message_input"
              placeholder="Please Enter Your Message"
            />
            {messageText.length > 0 && <button onClick={handleSubmit} className="message_send_btn">Send</button>}
            <div ref={emojiRef}>
              {showEmoji ? (
                <button onClick={() => setShowEmoji(false)} className="message_send_btn">
                  Unemoji
                </button>
              ) : (
                <button onClick={() => setShowEmoji(true)} className="message_send_btn">
                  Emoji
                </button>
              )}
              {showEmoji && (
                <div className="emoji_wrapper">
                  <EmojiPicker onEmojiClick={handleEmojiPic} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>Please select a user</h2>
        </div>
      )}
    </div>
  );
};

export default Message;