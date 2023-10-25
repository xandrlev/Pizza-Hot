import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  categoryId: 0,
  categoriesName: ["All", "Meat", "Vegetarian", "BBQ", "Spicy", "Сheese"],
  sort: {
    name: "popularity",
    sort: "rating",
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    categoriesFilter: (state, { payload }: PayloadAction<number>) => {
      state.categoryId = payload;
    },
    categoriesSort: (state, { payload }) => {
      state.sort = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    setFilters: (state, { payload }) => {
      state.categoryId = +payload.categoryId;
      state.currentPage = +payload.currentPage;
      state.sort = payload.sort;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
