import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userLoggedIn: false,
  userDetails: null,
  token: null,
  userRoles:null,
  clientId:null,
  clientDetails: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state) => {
      state.userLoggedIn = true;
    },
    logOut: (state) => {
     state.userLoggedIn= false,
      state.userDetails=null,
      state.token=null,
      state.userRoles=null,
      state.clientId=null,
      state.clientDetails=null,
      sessionStorage.clear();
      localStorage.clear();
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserRoles: (state, action) => {
      state.userRoles = action.payload;
    },
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
    setClientDetails: (state, action) => {
      state.clientDetails = action.payload;
    },
  },
})

export const { logIn, logOut, setUserDetails, setToken, setUserRoles, setClientId,setClientDetails } = authSlice.actions

export default authSlice.reducer;
