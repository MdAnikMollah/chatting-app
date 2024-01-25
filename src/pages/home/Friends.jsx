import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utils/Image'
import { FaPlus } from 'react-icons/fa'

const Friends = () => {
  return (
    <>
    <GroupCard cardtitle="Friends"> 
        <div className='usermainbox'>
          {[0,1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className='useritem'>
            <div className="userimgbox">
              <Image src="" alt="img"/>
            </div>
            <div className='userinfobox'>
              <div>
                <h3>Anik</h3>
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