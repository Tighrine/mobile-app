import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlice } from "./state/auth";

export default configureStore({
    reducer: {
        user: userSlice.reducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      })
});