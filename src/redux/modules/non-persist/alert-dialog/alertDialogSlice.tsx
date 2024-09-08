import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DialogModal } from './@types';

const initialState: DialogModal = {
  open: false,
  title: '',
  content: '',
  status: 'info',
  countDown: 3000,
};

export const alertDialogSlice = createSlice({
  name: 'dialogModal',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<DialogModal>) => {
      state.open = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.status = action.payload.status;
      state.confirmText = action.payload.confirmText;
      state.onConfirm = action.payload.onConfirm;
      state.cancelText = action.payload.cancelText;
      state.countDown = action.payload.countDown ? action.payload.countDown : 3000;
    },
    closeDialog: (state) => {
      state.open = false;
      state.title = '';
      state.content = '';
      state.status = 'info';
      state.confirmText = '';
      state.cancelText = '';
      state.onConfirm = () => {};
      state.countDown = 3000;
    },
  },
});

export const { openDialog, closeDialog } = alertDialogSlice.actions;
export const alertDialogSelector = (state: { alertDialog: DialogModal }) => state.alertDialog;
export default alertDialogSlice.reducer;
