import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

export const menuSlice = createSlice({
    name: "menuInfo",
    initialState: initialState,
    reducers: {
        attachMenu: (state, actions)=>{

            for(const item in actions.payload){
                state.push(item);
            };
        },
        detatchMenu: (state)=>{
            state = initialState;
        }
    }
});

export const {attachMenu, detachMenu} = menuSlice.actions;

export default menuSlice.reducer;