import { createSlice, current } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name:'user',
    initialState:[
    ],
    reducers: {
        addUserName: (state,action) => {
            const userName = {
                username: action.payload.username
            }
            //clear state
            state.length = 0;
            state.push(userName);
            console.log(current(state));
        }
    }

})
export const { addUserName } = userSlice.actions;
export default userSlice.reducer;