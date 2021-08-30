import React, { useState, useEffect, useRef } from 'react'
import firebase from 'firebase/app'
import Message from './Message'
import { useSelector, useDispatch } from 'react-redux'
import { changeChat } from '../currentChat'

import profileIMG from '../logo/profileIMG.png'

const Users = ({ user=null , db=null }) => {
  const [userList, setUserList] = useState([])
  const chat = useSelector((state) => state.chat.value)
  const dispatch = useDispatch()
  
  function updateChatState(value){
    dispatch(changeChat(value))
  }
  
  
  
  useEffect(() => {
    
    
    if(db){
      const userData = db.collection('users').limit(100).onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          ... doc.data(),
          id: doc.id,
        }))
      
        setUserList(data)
      })
      return userData
    }

  })

  

 
    
    
   /* if(db){
      const unsubscribe = db.collection('messages').orderBy('createdAt').limit(1000).onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          ... doc.data(),
          id: doc.id,
        }))
      
        setMessages(data)
      })
      return unsubscribe
    }
  }, [db])
*/
  
  
  return (
    <div className='users'>
      {userList.map(userName => (
            <div onClick={() => updateChatState(userName.name)} className='user'> 
              <img src={profileIMG}></img>
              <p>
                {userName.name}
              </p>
            </div>
        ))}
    </div>
  )
}


export default Users