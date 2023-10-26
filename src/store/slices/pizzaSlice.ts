import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://651ec03244a3a8aa4768f0df.mockapi.io/pizzas";

export const fetchPizza = createAsyncThunk(
  "pizzas/fetchPizza",
  async (pizza: Pizzas, thunkApi) => {
    const { data } = await axios.get(
      `${BASE_URL}?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sort.sort}&search=${debounceSearch}`
    );
    return data;
  }
);

export interface Pizzas {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

const initialState = {
  pizzas: [] as Pizzas[],
};

export const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    loadPizza: (state, { payload }) => {
      state.pizzas = payload;
    },
  },
});

export const pizzaActions = pizzaSlice.actions;

export default pizzaSlice.reducer;
