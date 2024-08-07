import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';



const store = configureStore({
    reducer:{

        [apiSlice.reducerPath] : apiSlice.reducer,
       
    },
    middleware : (getDefaultMiddleware) =>{
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
})

setupListeners(store.dispatch);

store.subscribe(()=>{
    console.log(store.getState())

})


export default store;