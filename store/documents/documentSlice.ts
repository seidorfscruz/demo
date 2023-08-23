import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0
};

export const documentSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        increment: (state, /* action */ ) => {
            state.value += 1;
        },
    }
});

export const { increment } = documentSlice.actions;