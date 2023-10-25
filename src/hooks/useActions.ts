import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { cartActions } from "../store/slices/cartSlice";
// import {  } from "../store/slices/filterSlice";

const actions = {
  ...cartActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
