import {configureStore} from '@reduxjs/toolkit';
import cvReducer from './cvSlice';

//creates stores and reducers, then exports
export default configureStore({
    reducer:{
        cv:cvReducer
    },
})