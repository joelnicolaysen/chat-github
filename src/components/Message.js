import React from 'react'
import { formatRelative } from 'date-fns'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const Message = ({
  createdAt = null,
  text = '',
  user=null,
  displayName = '',
  key=null,
  photoURL = '',
  isCurrentUserBoolean = false,
}) => {

  const isCurrentUser = () => {
    if(displayName === auth.currentUser.displayName)
    isCurrentUserBoolean = true
    else{
      isCurrentUserBoolean = false
    }
  }

  

  const auth = firebase.auth()
  isCurrentUser()
  
  
  return (
    <div key={key}>
    {isCurrentUserBoolean ? (
      <div className='myMessage'>
      <div className='myMessageInfo'>
        {displayName ? <p className='myDisplayName'>{displayName}</p> : null}
        {createdAt?.seconds ? (
          <p className='myCreatedAt'>
            {formatRelative(new Date(createdAt.seconds * 1000), new Date()
            )}
          </p>) : null}
      </div>
      <p className='myMessage-p'>{text}</p>
        
    </div>

    ) : (
      <div className='message'>
      <div className='messageInfo'>
        {displayName ? <p className='displayName'>{displayName}</p> : null}
        {createdAt?.seconds ? (
          <p className='createdAt'>
            {formatRelative(new Date(createdAt.seconds * 1000), new Date()
            )}
          </p>) : null}
      </div>
      <p className='message-p'>{text}</p>
        
    </div>
    ) }
    </div>

      
    
      
    
    
  )
}

export default Message 