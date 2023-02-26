import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  userDataToDisplay: {},
  deleteAccountModal: true,
  userDataToDisplay: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserDataToDisplay: (state, action) => {
      state.userDataToDisplay = action.payload;
    },
    setDeleteAccountModal: (state, action) => {
      state.deleteAccountModal = action.payload;
    },
    //reset store state after logout or delete of account
    cleanStore: () => initialState,
  },
});

export const getErrors = (state) => state.users.showErrors;
export const getUserDataToDisplay = (state) => state.users.userDataToDisplay;
export const getDeleteAccountModal = (state) => state.users.deleteAccountModal;

export const {
  setOpenDeleteModal,
  setDeleteAccountModal,
  cleanStore,
  setUserDataToDisplay,
} = usersSlice.actions;

export default usersSlice.reducer;
