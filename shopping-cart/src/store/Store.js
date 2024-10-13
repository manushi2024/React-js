import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./CreateSlice"
import ProductReducer from "./ProductSlice";

const store = configureStore({
    reducer:{
        cart:cartReducer,
        product:ProductReducer,
        devTools: process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_ && window.__REDUX_DEVTOOLS_EXTENSION_(),
    }
    
})

export default store;