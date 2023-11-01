import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Sort = {
  name: "popularity" | "price" | "alphabetizing";
  sort: "rating" | "price" | "title";
};

type CategoriesName =
  | "All"
  | "Meat"
  | "Vegetarian"
  | "BBQ"
  | "Spicy"
  | "Сheese";

interface FilterSlice {
  searchValue: string;
  categoryId: number;
  categoriesName: CategoriesName[];
  sort: Sort;
  currentPage: number;
}

export const initialState: FilterSlice = {
  searchValue: "",
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
    categoriesSort: (state, { payload }: PayloadAction<Sort>) => {
      state.sort = payload;
    },
    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
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
