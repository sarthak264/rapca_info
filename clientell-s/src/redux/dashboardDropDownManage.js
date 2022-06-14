import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "dashboarddropdownmanage",
    initialState: { value: [] },
    reducers: {
        usersUpdate: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { usersUpdate } = slice.actions
export default slice.reducer