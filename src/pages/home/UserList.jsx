import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import { FaPlus } from 'react-icons/fa'
import Image from '../../utils/Image'

const UserList = () => {
  return (
   <>
   <GroupCard cardtitle="User List"> 
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
                <FaPlus />
              </button>
            </div>
          </div>
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
                <FaPlus />
              </button>
            </div>
          </div>
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
                <FaPlus />
              </button>
            </div>
          </div>
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
                <FaPlus />
              </button>
            </div>
          </div>
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
                <FaPlus />
              </button>
            </div>
          </div>
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
                <FaPlus />
              </button>
            </div>
          </div>
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
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </GroupCard>
   </>
  )
}

export default UserList