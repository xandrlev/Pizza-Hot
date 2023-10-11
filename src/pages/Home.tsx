import { useEffect, useState } from "react";
import { Categories } from "../components/Categories/Categories";
import { IPropsPizzaCard, PizzaCard } from "../components/PizzaCard/PizzaCard";
import { Sort, SortItem } from "../components/Sort/Sort";
import { PizzaSkeleton } from "../components/PizzaCard/PizzaSkeleton";

interface HomeProps {
  searchValue: string;
}

export const Home = ({ searchValue }: HomeProps) => {
  const BASE_URL = "https://651ec03244a3a8aa4768f0df.mockapi.io/pizzas";

  const [pizzas, setPizzas] = useState<IPropsPizzaCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortValue, setSortValue] = useState({
    name: "popularity",
    sort: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${BASE_URL}?${categoryId > 0 ? `category=${categoryId}` : ""}&sortBy=${
        sortValue.sort
      }`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
        // window.scrollTo(0, 0);
      });
  }, [categoryId, sortValue]);

  const onClickCategory = (id: number) => {
    setCategoryId(id);
  };

  const onClickSort = (sort: SortItem) => {
    setSortValue(sort);
  };

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort sortValue={sortValue} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? pizzas.map((_, i) => <PizzaSkeleton key={i} />)
          : pizzas
              .filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              ) //search pizza from input
              .map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
};
