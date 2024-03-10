import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../services/store";
import { ValueBooleanState } from "../utils/constants";

const initialState: ValueBooleanState = {
  value: false,
};

export const darklightSlice = createSlice({
  name: "darklight",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleTheme } = darklightSlice.actions;
export const getTheme = (state: RootState) => state.darklight.value;

export default darklightSlice.reducer;
