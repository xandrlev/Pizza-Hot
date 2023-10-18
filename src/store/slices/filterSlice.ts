import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: {
    categoryId: 0,
    categoriesName: ["All", "Meat", "Vegetarian", "BBQ", "Spicy", "Сheese"],
  },
  sort: {
    name: "popularity",
    sort: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    categoriesFilter: (state, { payload }: PayloadAction<number>) => {
      state.categories.categoryId = payload;
    },
    categoriesSort: (state, { payload }) => {
      state.sort = payload;
    },
  },
});

export const { categoriesFilter, categoriesSort } = filterSlice.actions;

export default filterSlice.reducer;
