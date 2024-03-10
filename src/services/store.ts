import { configureStore } from "@reduxjs/toolkit";

//darkmode light mode
import darklightReducer from "../features/darklightSlice";

//is authenticated is not authenticated
import authReducer from "../features/authSlice";

//toggle between modals
import modalReducer from "../features/modalSlice";

const store = configureStore({
  reducer: {
    darklight: darklightReducer,
    authentication: authReducer,
    modal: modalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
