import { useEffect, useState } from "react";
import { Categories } from "../components/Categories/Categories";
import { IPropsPizzaCard, PizzaCard } from "../components/PizzaCard/PizzaCard";
import { Sort } from "../components/Sort/Sort";
import { PizzaSkeleton } from "../components/PizzaCard/PizzaSkeleton";

export const Home = () => {
  const BASE_URL = "https://651ec03244a3a8aa4768f0df.mockapi.io/pizzas";
  const [pizzas, setPizzas] = useState<IPropsPizzaCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
  }, [pizzas]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(8)].map((_, i) => <PizzaSkeleton key={i} />)
          : pizzas.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
};
