import { deleteCookie } from '@/utils/helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '@/lib/axios'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const initialState = {
  userLoggedIn: false,
  userDetails: null,
  token: null,
  userRoles:null,
  clientId:null,
  clientDetails: null,
  hasEmailAccounts: false,
  isLoading: false,
  emailAccountsChecked: false,
  error: null,
}

export const checkEmailAccounts = createAsyncThunk(
  'auth/checkEmailAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const baseUrl = supabaseUrl + '/functions/v1/list-smartlead-email-accounts';
      const response = await api.get(baseUrl);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check email accounts');
    }
  }
);

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
      deleteCookie('access_token');
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
  extraReducers: (builder) => {
    builder
      .addCase(checkEmailAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkEmailAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasEmailAccounts = true;
        state.emailAccountsChecked = true;
      })
      .addCase(checkEmailAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.emailAccountsChecked = true;
      });
  },
})

export const { logIn, logOut, setUserDetails, setToken, setUserRoles, setClientId,setClientDetails } = authSlice.actions

export default authSlice.reducer;
