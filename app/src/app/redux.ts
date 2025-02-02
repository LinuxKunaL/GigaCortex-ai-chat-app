import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit';
import {TUser} from '../types/user';

// here is a code for redux slice
const meSlice = createSlice({
  name: 'me',
  initialState: {} as TUser,
  reducers: {
    setMe(state, action: PayloadAction<TUser>) {
      return action.payload;
    },
  },
});

const refreshKeySlice = createSlice({
  name: 'refreshKey',
  initialState: 0,
  reducers: {
    setRefreshKey(state) {
      return state + 1;
    },
  },
});

// here is a code for redux store
const store = configureStore({
  reducer: {
    me: meSlice.reducer,
    refreshToken: refreshKeySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const {setMe} = meSlice.actions;
const {setRefreshKey} = refreshKeySlice.actions;

export {store, setMe, setRefreshKey};
