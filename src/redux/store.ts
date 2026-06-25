import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
// store -> 'stores' the state of the application and provides a way to access and update that state. It is a central place where all the state of the application is kept. The store is created using the configureStore function from Redux Toolkit, which simplifies the process of setting up a Redux store.
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;