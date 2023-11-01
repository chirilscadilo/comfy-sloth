import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductFavoriteInterface } from "../../models/IProduct";

interface RemoveFavoriteProduct {
  id: string | undefined;
}

interface ProductFavorite {
  productFavorite: ProductFavoriteInterface[];
}

const initialState: ProductFavorite = {
  productFavorite: [],
};

export const favoriteSlice = createSlice({
  name: "favoriteProducts",
  initialState,
  reducers: {
    getProductFavorite(state, action: PayloadAction<ProductFavoriteInterface>) {
      state.productFavorite.push({ ...action.payload });
    },
    removeProductFavorite(state, action: PayloadAction<RemoveFavoriteProduct>) {
      state.productFavorite = state.productFavorite.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { getProductFavorite, removeProductFavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
