import { createSlice } from "@reduxjs/toolkit";
export const slice = createSlice({
    name: "optionstatemange",
    initialState: {
        value: {
            sidebar: 0,
            subtarget: 0
        }
    },
    reducers: {
        sidebarUpdate: (state, action) => {
            state.value.sidebar = action.payload
        }
    }
})

export const { sidebarUpdate } = slice.actions
export default slice.reducer