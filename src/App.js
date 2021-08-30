import React, { useState, useEffect} from 'react'
import './App.css';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import SignInButton from './components/SignInButton'
import Channel from './components/Channel'
import Users from './components/Users'
import CogniteLogo from './logo/CogniteLogo_new.svg'



firebase.initializeApp({
  apiKey: "AIzaSyDVybeswiimXcQrPuluQil6JVhVLxsCR-M",
  authDomain: "cognite-chat-65e00.firebaseapp.com",
  projectId: "cognite-chat-65e00",
  storageBucket: "cognite-chat-65e00.appspot.com",
  messagingSenderId: "856834675183",
  appId: "1:856834675183:web:becfe692c4eb90798aa61a"
});

const auth = firebase.auth()
const db = firebase.firestore()

function App() {
  const [user, setUser] = useState(() => auth.currentUser)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } 
      else{
        setUser(null)
      }
      if(initializing){
        setInitializing(false)
      }
    })
    return unsubscribe
  }, [])

  const SignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.useDeviceLanguage()

    try{
      await auth.signInWithPopup(provider)
    }
    catch(error){
      console.error(error)
  
    }
  }

const signOut = async () => {
  try{
    await firebase.auth().signOut()
  }

  catch (error){
  console.log(error.message)
  }
}

if(initializing) return 'Loading...'

  return (
    <div>
      {user ? (
        <div>
          <div className='header'>
          <img src={CogniteLogo} alt="Cognite Logo" />
            <SignInButton onClick={signOut}>Sign out</SignInButton>
          </div>
         
          <Users user={user} db={db}/>
          <Channel user={user} db={db}/>
        
        </div>

      ) : (
        <div>
          <div className='header'>
            <img src={CogniteLogo} alt="Cognite Logo" />
          <SignInButton onClick={SignInWithGoogle}>Sign in with Google</SignInButton>
          </div>
          <div className='container'>
            <h1>Hello! Please sign in to access the Cognite Chat.</h1>
          </div>
        </div>
      ) }
    </div>
  );
}

export default App;
