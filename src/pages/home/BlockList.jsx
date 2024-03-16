import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utils/Image'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";

const BlockList = () => {
  const [blockList,setBlockList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)

  useEffect(()=>{
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item)=>{
      if(item.val().whoblockid == data.uid){
        arr.push({...item.val(),id:item.key});

      }
  })
  setBlockList(arr)
  });

  },[])

  let handleUnblock = (unblockinfo) => {
    console.log(unblockinfo);
    
      remove(ref(db, "block/" + unblockinfo.id))
    }
  
    
  
  return (
    <>
    <GroupCard cardtitle="Block List"> 
        <div className='usermainbox'>
          {blockList && blockList.map((item,index)=>(
          <div key={index} className='useritem'>
            <div className="userimgbox">
              <Image src="" alt="img"/>
            </div>
            <div className='userinfobox'>
              <div>
                <h3>{item.blockname}</h3>
                <p>MERN developer</p>
              </div>
              <button  onClick={()=>handleUnblock(item)} className='addbutton'>
                Unblock
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


export default BlockList