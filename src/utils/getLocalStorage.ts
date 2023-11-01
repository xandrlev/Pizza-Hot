import { calcTotalPrice } from "./calcTotalPrice";

export const getFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  const pizzas = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(pizzas);

  return {
    pizzas,
    totalPrice,
  };
};
