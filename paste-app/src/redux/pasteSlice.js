import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // Add a check-: Paste already exists case
      state.pastes.push(paste)
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully")
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("{Paste updated")
      }
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice = (index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste delete");
      }
    },

    resetToPastes: (state, action) => {
      state.pastes = []
      localStorage.removeItem("pastes")
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  removeFromPastes,
  resetToPastes
} = pasteSlice.actions

export default pasteSlice.reducer