import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'settings',
    initialState: null,
    reducers: {},
});

export const { login, logout, } = slice.actions;
export default slice.reducer;