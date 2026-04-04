import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      state.pastes.push(action.payload)
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
    },

    updateToPastes: (state, action) => {
      const index = state.pastes.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.pastes[index] = action.payload
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
      }
    },

    removeFromPastes: (state, action) => {
      state.pastes = state.pastes.filter(p => p.id !== action.payload)
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
    },

    resetToPastes: (state) => {
      state.pastes = []
      localStorage.removeItem("pastes")
    },
  },
})

export const {
  addToPastes,
  updateToPastes,
  removeFromPastes,
  resetToPastes
} = pasteSlice.actions

export default pasteSlice.reducer