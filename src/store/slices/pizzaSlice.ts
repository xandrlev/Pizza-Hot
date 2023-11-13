import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Sort } from "./filterSlice";
import axios from "axios";

export interface Pizzas {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

interface IState {
  pizzas: Pizzas[];
  status: "loading" | "success" | "error";
}

interface FetchArgs {
  currentPage: number;
  categoryId: number;
  sort: Sort;
  debounceSearch: string | undefined;
}

const BASE_URL = "https://651ec03244a3a8aa4768f0df.mockapi.io/pizzas";

export const fetchPizza = createAsyncThunk(
  "pizzas/fetchPizza",
  async ({ currentPage, categoryId, sort, debounceSearch }: FetchArgs) => {
    const { data } = await axios.get<Pizzas[]>(
      `${BASE_URL}?page=${currentPage}&limit=8&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sort.sort}&search=${debounceSearch}`
    );
    return data;
  }
);

const initialState: IState = {
  pizzas: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    loadPizza: (state, { payload }: PayloadAction<Pizzas[]>) => {
      state.pizzas = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPizza.fulfilled, (state, { payload }) => {
      state.pizzas = payload;
      state.status = "success";
    });
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = "error";
      state.pizzas = [];
    });
  },
});

export const pizzaActions = pizzaSlice.actions;

export default pizzaSlice.reducer;
