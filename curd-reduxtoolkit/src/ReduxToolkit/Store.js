import {configureStore} from "@reduxjs/toolkit"
import curdreducer from "./Curdslice"
const store =configureStore({
    reducer:{
        AddFrom:curdreducer,
        devTools: process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_ && window.__REDUX_DEVTOOLS_EXTENSION_(),
    }
})

export default store;