import { createSlice } from '@reduxjs/toolkit'

export enum Pages {
  MAIN = '/',
  APPLICATION = '/apply',
  SIGNUP = '/login',
}

interface InterfaceState {
  activePage: Pages
}

const initialState = {
  activePage: Pages.MAIN,
} as InterfaceState

const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload
    },
  },
})

export const { setActivePage } = interfaceSlice.actions
export default interfaceSlice.reducer
