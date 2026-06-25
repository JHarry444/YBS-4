import { createSlice } from "@reduxjs/toolkit";

// When using createSlice, we define a slice of the state and the reducers that can modify that state. 
// The createSlice function takes an object with three properties: name, initialState, and reducers. 
// The name property is a string that identifies the slice, the initialState property is an object that defines the 
// initial state of the slice, and the reducers property is an object that defines the functions that can modify the state.

// With slices you do not need to worrry about mutating the state directly. Redux Toolkit uses the Immer library internally, 
// which allows you to write "mutating" logic in your reducers, but it actually creates a new state object under the hood. 
// This makes it easier to write and understand your reducers, while still maintaining the immutability of the state.

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        name: "",
        role: "USER",
    },
    reducers: {
        login: (state, action) => {
            const { name, role } = action.payload;
            state.isAuthenticated = true;
            state.name = name;
            state.role = role;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.name = "";
            state.role = "USER";
        }
    }
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;