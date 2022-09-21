import { createSlice, current } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name:'user',
    initialState:[
    ],
    reducers: {
        addUserName: (state,action) => {
            const userData = {
                username: action.payload.username,
                id: action.payload.id
            }
            //clear state
            state.length = 0;
            state.push(userData);
            console.log(current(state));
        }
    }

})
export const { addUserName } = userSlice.actions;
export default userSlice.reducer;