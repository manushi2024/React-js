import { configureStore } from "@reduxjs/toolkit"
import CurdReducer from "./Curdslice"

const store =configureStore({
    reducer:{
        From:CurdReducer
    }
})

export default store