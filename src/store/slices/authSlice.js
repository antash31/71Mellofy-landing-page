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
  isLoadingEmailAccounts: false,
  emailAccountsChecked: false,
  error: null,
  errorEmailAccounts: null,
  emailAccounts:[]
}

export const checkEmailAccounts = createAsyncThunk(
  'auth/checkEmailAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const baseUrl = supabaseUrl + '/functions/v1/list-smartlead-email-accounts';
      const response = await api.get(baseUrl);
      console.log({response})
      // Handle both single object and array responses
      const data = response.data.data;
      if(response.data.message=="No email found"){
        return [];
      }
      return Array.isArray(data) ? data : [data];
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
        state.isLoadingEmailAccounts = true;
        state.errorEmailAccounts = null;
      })
      .addCase(checkEmailAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingEmailAccounts = false;
        state.hasEmailAccounts = action.payload && action.payload.length > 0;
        state.emailAccountsChecked = true;
        state.emailAccounts = action.payload || [];
        state.errorEmailAccounts = null;
      })
      .addCase(checkEmailAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingEmailAccounts = false;
        state.emailAccountsChecked = true;
        state.errorEmailAccounts = action.payload || 'Failed to fetch email accounts';
      });
  },
})

export const { logIn, logOut, setUserDetails, setToken, setUserRoles, setClientId,setClientDetails } = authSlice.actions

export default authSlice.reducer;
