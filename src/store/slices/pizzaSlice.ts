import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const fetchPizza = createAsyncThunk("pizzas/fetchPizza",
//   async (pizza: Pizzas, thunkApi) => {
//     const {data} = await 
//   }
// );

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
