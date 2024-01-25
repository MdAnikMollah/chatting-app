import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utils/Image'

const FriendRequest = () => {
  return (
    <>
    <GroupCard cardtitle="Friend Request"> 
        <div className='usermainbox'>
          <div className='useritem'>
            <div className="userimgbox">
              <Image src="" alt="img"/>
            </div>
            <div className='userinfobox'>
              <div>
                <h3>Anik</h3>
                <p>MERN developer</p>
              </div>
              <button className='addbutton'>
                Accept
              </button>
            </div>
          </div>
        </div>
  </GroupCard> 
    </>
  )
}

export default FriendRequest