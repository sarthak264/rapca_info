import { createSlice } from "@reduxjs/toolkit"

export const slice = createSlice({
    name: "rollupfiltermanage",
    initialState: {
        value: {
            closing: "current-quarter",
            changes: "week"
        }
    },
    reducers: {
        rollUpFilterUpdate: (state, action) => {
            state.value = action.payload
        }
    }
})


export const { rollUpFilterUpdate } = slice.actions

export default slice.reducer