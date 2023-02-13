import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const userSlice = createSlice({
    name: 'userInfo',
    initialState: initialState,
    reducers: {
        setUser: (state, actions)=>{
            Object.keys(actions.payload).map((item)=>(
                state[item] = actions.payload[item]
            ))
        },
        deleteUser: (state)=>{
            state = initialState;
        }
    }
})
export const {setUser, deleteUser} = userSlice.actions;

export default userSlice.reducer;