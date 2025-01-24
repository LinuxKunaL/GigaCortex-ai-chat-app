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

// here is a code for redux store
const store = configureStore({
  reducer: {
    me: meSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const {setMe} = meSlice.actions;
export {store, setMe};
