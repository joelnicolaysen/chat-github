import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: '',
  },
  reducers: {
    changeChat: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeChat } = counterSlice.actions

export default counterSlice.reducer