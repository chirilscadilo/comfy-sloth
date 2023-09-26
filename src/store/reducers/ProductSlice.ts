import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models/IProduct";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RemoveProduct {
  id: string | undefined;
}

interface ProductState {
  products: Product[];
  totalAmount: number;
  totalSum: number;
  // isLoading: boolean;
  // error: string;
}

const initialState: ProductState = {
  products: [],
  totalAmount: 0,
  totalSum: 0,
};

export const productsPrickedSlice = createSlice({
  name: "pickedProducts",
  initialState,
  reducers: {
    increaseProductAmount(state, action: PayloadAction<Product>) {
      state.totalAmount += action.payload.amount;
      state.totalSum += action.payload.amount * action.payload.price;
      if (!state.products.find((item) => item.id === action.payload.id)) {
        state.products.push({ ...action.payload });
      } else {
        state.products = state.products.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              amount: item.amount + 1,
            };
          } else {
            return item;
          }
        });
      }
    },

    decreaseProductAmount(state, action: PayloadAction<Product>) {
      state.totalAmount -= 1;
      state.totalSum -= action.payload.price;
      if (
        state.products.find((item) => item.id === action.payload.id)?.amount ===
        1
      ) {
        state.products = state.products.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.products = state.products.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              amount: item.amount - 1,
            };
          } else {
            return item;
          }
        });
      }
    },

    removeCartProductLine(state, action: PayloadAction<RemoveProduct>) {
      const product = state.products.find(
        (item) => item.id === action.payload.id
      );
      state.totalAmount -= product!.amount;
      state.totalSum -= product!.amount * product!.price;
      state.products = state.products.filter((item) => item.id !== product!.id);
    },

    removeAllProducts(state) {
      state.totalAmount = 0;
      state.totalSum = 0;
      state.products = [];
    },
  },
});

export const {
  increaseProductAmount,
  removeCartProductLine,
  removeAllProducts,
  decreaseProductAmount,
} = productsPrickedSlice.actions;
export default productsPrickedSlice.reducer;
