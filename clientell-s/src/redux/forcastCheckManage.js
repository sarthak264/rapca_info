import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "forcastmanage",
    initialState: {
        value: {
            opportunity_ids: [],
            totalvalue: 0
        }
    },
    reducers: {
        opporUpdate: (state, action) => {
            state.value = action.payload
        }
    }

})

export const { opporUpdate } = slice.actions
export default slice.reducer
