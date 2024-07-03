import {configureStore} from '@reduxjs/toolkit'
import workersReducer from '../features/workers';
import absencesReducer from '../features/absence';


const store = configureStore({
    reducer:{
        workers: workersReducer,
        absences: absencesReducer,
    }
})



store.subscribe(()=>{
    console.log(store.getState())

})


export default store;