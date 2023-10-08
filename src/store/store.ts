import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsPrickedSlice from "./reducers/ProductSlice";
import currentUserSlice from "./reducers/UserSlice";

const reducers = combineReducers({
  products: productsPrickedSlice,
  user: currentUserSlice,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
