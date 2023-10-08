import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/IUser";

const initialState: User = {
  email: null,
  displayName: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    getCurrentUser(state, action: PayloadAction<User>) {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
    },
  },
});

export const { getCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
