import { Action, ActionCreator, PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState={
    currentNav:"База",
    currentTitleForAccess:'В админ панель'
}


const counterSlice = createSlice({
  name: 'nav_slice',
  initialState: initialState,
  reducers: {
    editNav: (state,action:PayloadAction<string>) => { state.currentNav=action.payload},
    editAccessTitle: (state,action:PayloadAction<string>) => { state.currentTitleForAccess=action.payload},
  },
});

export const {  editNav,editAccessTitle } = counterSlice.actions;
export default counterSlice.reducer;
