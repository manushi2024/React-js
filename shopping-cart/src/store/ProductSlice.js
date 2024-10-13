import { createSlice } from "@reduxjs/toolkit"

 export const status=Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
})
const initialState={
    data:[],
    states:status.IDLE
}
const productslice =createSlice({
    name:"product",
    initialState,
    reducers:{
        setproduct:(state,action)=>{
            state.data=action.payload
        },
        setstate:(state,action)=>{
            state.states=action.payload
        }
     },
    // extraReducers:(Build)=>{
    //         Build.addCase((state)=>{state.data=action.payload}).addCase((state,action)=>{ state.states=action.payload}).addCase(()=>{})
    // }
})

export const {setproduct,setstate} =productslice.actions;
export default  productslice.reducer;