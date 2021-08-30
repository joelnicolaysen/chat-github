import React, { useState, useEffect, useRef } from 'react'
import firebase from 'firebase/app'
import Message from './Message'
import SendPng from '../logo/send.png'
import { useSelector, useDispatch } from 'react-redux'

const Channel = ({ user=null , db=null }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const {uid, displayName, photoURL} = user; 
  const chat = useSelector((state) => state.chat.value)

  const messagesEndRef = React.useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  scrollToBottom()

  React.useEffect(() => {
    scrollToBottom()
    
    if(db){
      if(chat){
      const unsubscribe = db.collection(chat).orderBy('createdAt').limit(1000).onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          ... doc.data(),
          id: doc.id,
        }))
      
        setMessages(data)
      })
      return unsubscribe
    }
  }
    
  })

  const handleOnChange = e => {
    setNewMessage( e.target.value)
  }

  const handleOnSubmit = e => {
    
    e.preventDefault();
    if(db){
      db.collection(chat).add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL
      })
    }
    setNewMessage('');
  }
  return (
    <div className='channel'>
      <div>
        {messages.map(message => (
            <Message  {...message} user={user}/>
        ))}
         <div ref={messagesEndRef} />
        
      </div>
      <div className='inputMessage'>
        <form onSubmit={handleOnSubmit}>
        <input type="text" value={newMessage} onChange={handleOnChange} placeholder="Aa"/>
        <button className='chatButton' type="submit" disabled={!newMessage}>
          <img className='sendPng' src={SendPng}></img>
        </button>
        
        </form>
      </div>
    </div>
  )
}

export default Channel