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
        skills:null,
        fileName:""
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
        addFileName: (state,action) => {
            console.log(state)
         return {...state, fileName:action.payload.fileName}
          
            
        },
        reset: (state, action) => {
            //clear about
            state.about.length=0
            state.education = "";
            state.experience= "";
            state.projects="";
            state.skills=""
            state.fileName=""
            console.log(state);
            
        }
}});
export const { editCv, aboutSection, reset, addFileName } = cvSlice.actions
export default cvSlice.reducer;
