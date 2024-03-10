/**
 * ui state changes depending on the pin modal and on listElement click.
 * when pin is correct, make pin modal invisible (do not display it by turning of its state) and display readonly modal.
 * when user clicks the close button (icon type) on readonly modal, make both modals invisible (pin modal should already be invisible)
 */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../services/store";

const initialState: {
  showPinModal: boolean;
  showReadonlyModal: boolean;
  modalData: string;
} = {
  showPinModal: false,
  showReadonlyModal: false,
  modalData: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onShowPinModal: (state, action) => {
      state.showPinModal = action.payload;
    },

    onShowReadonlyModal: (state, action) => {
      state.showReadonlyModal = action.payload;
    },
    onModalData: (state, action) => {
      state.modalData = action.payload;
    },
  },
});

export const { onShowPinModal, onShowReadonlyModal, onModalData } =
  modalSlice.actions;

export const getPinModal = (state: RootState) => state.modal.showPinModal;
export const getReadonlyModal = (state: RootState) =>
  state.modal.showReadonlyModal;
export const getModalData = (state: RootState) => state.modal.modalData;

export default modalSlice.reducer;
