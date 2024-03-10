import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../services/store";
import { ValueBooleanState } from "../utils/constants";

const initialState: ValueBooleanState = {
  value: false,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    toggleAuth: (
      state: { value: boolean },
      action: { payload: boolean }
    ): void => {
      state.value = action.payload;
    },
  },
});

export const { toggleAuth } = authSlice.actions;

export const getAuth = (state: RootState) => state.authentication.value;

export default authSlice.reducer;
