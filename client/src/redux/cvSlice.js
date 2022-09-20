import { createSlice, current } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
export const cvSlice = createSlice({
    name:'cv',
    initialState:{
        //initialize object with the category names we will be using
        id:uuidv4(),
        about:[
        ],
        education:null,
        experience:null,
        projects:null,
        skills:null
    },
    reducers: {
        aboutSection: (state, action) => {
            console.log(current(state));
           const about = {
            firstName:action.payload.firstName,
            lastName:action.payload.lastName,
            title: action.payload.title,
            phone:action.payload.phone,
            email:action.payload.email,
            city: action.payload.city,
            linkedin:action.payload.linkedin,
            github:action.payload.github
           }
           //clear array
           state.about.length = 0;
           //push new details
           state.about.push(about);
           console.log(current(state.about));
        },
}});
export const { editCv, aboutSection } = cvSlice.actions
export default cvSlice.reducer;
