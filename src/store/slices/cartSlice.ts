import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../../utils/getLocalStorage";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export interface PizzaCartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  sizes: number;
  count: number;
}

const { pizzas, totalPrice } = getFromLocalStorage();

const initialState = {
  totalPrice: totalPrice,
  itemsPizzas: pizzas as PizzaCartItem[],
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

      state.totalPrice = calcTotalPrice(state.itemsPizzas);
    },
    minusPizza: (state, { payload }: PayloadAction<string>) => {
      const findItem = state.itemsPizzas.find((item) => item.id === payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
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
