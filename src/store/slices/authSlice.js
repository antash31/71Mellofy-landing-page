import { deleteCookie } from '@/utils/helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '@/lib/axios'
import { supabase } from '@/utils/supabase';

const supabaseUrl = process.env.SUPABASE_URL;
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
  emailAccounts:[],
  doesCampaignExist: false,
  isLoadingCampaign: false,
  campaignError: null,
  isAuthenticated: false,
  isLoadingUser: true,
  userError: null,
}

export const checkEmailAccounts = createAsyncThunk(
  'auth/checkEmailAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const baseUrl = supabaseUrl + '/functions/v1/list-smartlead-email-accounts';
      const response = await api.get(baseUrl);

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

export const checkCampaign = createAsyncThunk(
  'auth/checkCampaign',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(supabaseUrl + '/functions/v1/GET-Campaign-Check');
      return response.data.exists;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check campaign');
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(supabaseUrl + '/functions/v1/Me',{});
      
      return response.data.profile;
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get user profile');
    }
  }
);

// Async thunk for getting current user
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get current user');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      
      // Clear all storage
      if (typeof window !== 'undefined') {
        // Clear localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('supabase.auth.token');
        Object.keys(localStorage).forEach(key => {
          if (key.includes('supabase') || key.includes('sb-')) {
            localStorage.removeItem(key);
          }
        });
        
        // Clear sessionStorage
        sessionStorage.clear();
        
        // Clear cookies
        deleteCookie('access_token');
      }
      
      return null;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to logout');
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
      state.userLoggedIn = false;
      state.userDetails = null;
      state.token = null;
      state.userRoles = null;
      state.clientId = null;
      state.clientDetails = null;
      state.user = null;
      state.isAuthenticated = false;
      state.userError = null;
      sessionStorage.clear();
      localStorage.clear();
      deleteCookie('access_token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoadingUser = false;
      state.userError = null;
      state.userLoggedIn = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoadingUser = false;
      state.userError = null;
      state.userLoggedIn = false;
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
      // checkEmailAccounts
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
      })
      // checkCampaign
      .addCase(checkCampaign.pending, (state) => {
        state.isLoadingCampaign = true;
        state.campaignError = null;
      })
      .addCase(checkCampaign.fulfilled, (state, action) => {
        state.isLoadingCampaign = false;
        state.doesCampaignExist = action.payload;
        state.campaignError = null;
      })
      .addCase(checkCampaign.rejected, (state, action) => {
        state.isLoadingCampaign = false;
        state.campaignError = action.payload || 'Failed to check campaign';
      })
      // getUserProfile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to get user profile';
      })
      // getCurrentUser
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoadingUser = true;
        state.userError = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.userLoggedIn = !!action.payload;
        state.userError = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.user = null;
        state.isAuthenticated = false;
        state.userLoggedIn = false;
        state.userError = action.payload;
      })
      // logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.userError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.userLoggedIn = false;
        state.userError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.userError = action.payload;
        // Even if logout fails, clear the user state
        state.user = null;
        state.isAuthenticated = false;
        state.userLoggedIn = false;
      });
  },
})

export const { logIn, logOut, setUserDetails, setToken, setUserRoles, setClientId, setClientDetails, setUser, clearUser } = authSlice.actions

export default authSlice.reducer;
