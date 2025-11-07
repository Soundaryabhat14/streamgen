import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice"

//state -  saved data which whole application can access
// action -  a message we will send to our Redux store saying - Update the store with this data
// reducer - function that actually does the job of updating the state based on the action
const appStore = configureStore(

    {
        // reducer - the function that tells the Redux store how to update the store  when an action arrives
        reducer:{
            user:userReducer,
            movies:moviesReducer
            
        }
    }
)

export default appStore;