import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PizzaCartItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  sizes: number;
  count: number;
}

const initialState = {
  totalPrice: 0,
  itemsPizzas: [] as PizzaCartItem[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, { payload }: PayloadAction<PizzaCartItem>) => {
      const findItem = state.itemsPizzas.find((item) => item.id === payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.itemsPizzas.push({ ...payload, count: 1 });
      }

      state.totalPrice = state.itemsPizzas.reduce(
        (sum, curr) => sum + curr.price * curr.count,
        0
      );
    },
    minusPizza: (state, { payload }) => {
      const findItem = state.itemsPizzas.find((item) => item.id === payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
      }
      if (findItem!.count < 1) {
        state.itemsPizzas = state.itemsPizzas.filter(
          (item) => item !== findItem
        );
      }
    },
    removePizza: (state, { payload }: PayloadAction<PizzaCartItem>) => {
      state.itemsPizzas = state.itemsPizzas.filter(
        (item) => item.id !== payload.id
      );
      state.totalPrice = state.totalPrice - payload.price * payload.count;
    },
    clearPizza: (state) => {
      state.itemsPizzas = [];
      state.totalPrice = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
