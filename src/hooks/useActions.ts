import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { cartActions } from "../store/slices/cartSlice";
import { pizzaActions, fetchPizza } from "../store/slices/pizzaSlice";
import { filterActions } from "../store/slices/filterSlice";

const actions = {
  ...filterActions,
  ...cartActions,
  ...pizzaActions,
  fetchPizza,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
