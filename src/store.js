import { configureStore } from '@reduxjs/toolkit'
import currentChat from './currentChat'

export default configureStore({
  reducer: {
    chat: currentChat,
  },
})