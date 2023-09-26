import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsPrickedSlice from "./reducers/ProductSlice";

const reducers = combineReducers({
  products: productsPrickedSlice,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
