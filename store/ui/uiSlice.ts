import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        startLoading: (state, /* action */ ) => {
            state.isLoading = true;
        },
        finishLoading: (state, /* action */ ) => {
            state.isLoading = false;
        },
    }
});

export const { startLoading, finishLoading } = uiSlice.actions;