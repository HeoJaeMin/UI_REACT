import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import menuReducer from '../slice/menuSlice';

export const store = configureStore({
    reducer: {
        userInfo: userReducer,
        menuInfo: menuReducer
    }
});