import { useEffect, useState } from "react";
import { Categories } from "../components/Categories/Categories";
import { IPropsPizzaCard, PizzaCard } from "../components/PizzaCard/PizzaCard";
import { Sort, SortItem } from "../components/Sort/Sort";
import { PizzaSkeleton } from "../components/PizzaCard/PizzaSkeleton";
import { Pagination } from "../components/Pagination/Pagination";

export interface HomeProps {
  searchValue: string;
}

export const Home = ({ searchValue }: HomeProps) => {
  const BASE_URL = "https://651ec03244a3a8aa4768f0df.mockapi.io/pizzas";

  const [pizzas, setPizzas] = useState<IPropsPizzaCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState({
    name: "popularity",
    sort: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${BASE_URL}?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortValue.sort}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
  }, [categoryId, sortValue, currentPage]);

  const onClickCategory = (id: number) => {
    setCategoryId(id);
  };

  const onClickSort = (sort: SortItem) => {
    setSortValue(sort);
  };

  const onChangeCurrentPage = (page: number) => {
    setCurrentPage(page);
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
              ) //local search pizza from input
              .map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)}
      </div>
      <Pagination onChangeCurrentPage={onChangeCurrentPage} />
    </>
  );
};
