import { PizzaCartItem } from "../store/slices/cartSlice";

export const calcTotalPrice = (itemsPizzas: PizzaCartItem[]) => {
  return itemsPizzas.reduce((sum, curr) => sum + curr.price * curr.count, 0);
};
