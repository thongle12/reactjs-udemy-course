import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';

export const register = createAsyncThunk('users/register', async (payload) => {
  //call api
  const data = await userApi.register(payload);
  //save data
  localStorage.setItem(StorageKeys.TOKEN , data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  return data.user;
});

export const login = createAsyncThunk('users/login', async (payload) => {
  //call api
  const data = await userApi.login(payload);
  //save data
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  return data.user;
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state){
      //clear localstorage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);



      //reset current thành {} rỗng
      state.current = {};
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const {logout} = actions;
export default reducer;
