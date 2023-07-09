import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
  value: string,
  innerValues: Array<string>,
  show: boolean
}

const initialState: ModalState = {
  value: "none",
  innerValues: [],
  show: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
        state.show = true;
        state.value = action.payload
    },
    hideModal: (state) => {
        state.show = false;
        state.value = "none"
    }
  },
})

// Action creators are generated for each case reducer function
export const { showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer