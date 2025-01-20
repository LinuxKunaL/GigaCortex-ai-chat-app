import {createSlice, configureStore} from '@reduxjs/toolkit';

// here is a code for redux slice
const meSlice = createSlice({
  name: 'me',
  initialState: {},
  reducers: {
    setMe(state, action) {
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

const {setMe} = meSlice.actions;
export {store, setMe};
