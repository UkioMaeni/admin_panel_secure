import { Action, ActionCreator, PayloadAction, createSlice } from '@reduxjs/toolkit';

type Init={
  currentNav:string;
  currentTitleForAccess:string;
  dbcounter:string;
  adminsPanel:Array<{login:string,id:number}>;
  activeMail:string;
  pbList:Array<{login:string,id:number}>;
}


const initialState:Init={
    currentNav:"База",
    currentTitleForAccess:'В админ панель',
    dbcounter:"",
    adminsPanel: [],
    activeMail:'',
    pbList:[]
}


const counterSlice = createSlice({
  name: 'nav_slice',
  initialState: initialState,
  reducers: {
    editNav: (state,action:PayloadAction<string>) => { state.currentNav=action.payload},
    editAccessTitle: (state,action:PayloadAction<string>) => { state.currentTitleForAccess=action.payload},
    editDbCounter: (state,action:PayloadAction<string>) => { state.dbcounter=action.payload},
    editAdmins: (state,action:PayloadAction<Array<{login:string,id:number}>>) => { state.adminsPanel=action.payload},
    editActiveMail: (state,action:PayloadAction<string>) => { state.activeMail=action.payload},
    editPbList: (state,action:PayloadAction<Array<{login:string,id:number}>>) => { state.pbList=action.payload},
  },
});

export const {  editNav,editAccessTitle,editDbCounter,editAdmins,editActiveMail,editPbList } = counterSlice.actions;
export default counterSlice.reducer;
