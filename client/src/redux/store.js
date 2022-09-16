import {configureStore} from '@reduxjs/toolkit';
import cvReducer from './cvSlice';
import userReducer from './userSlice';
//creates stores and reducers, then exports
export default configureStore({
    reducer:{
        cv:cvReducer,
        user:userReducer
    },
})