import { useEffect, useState } from "react";
import { Categories } from "../components/Categories/Categories";
import { IPropsPizzaCard, PizzaCard } from "../components/PizzaCard/PizzaCard";
import { Sort, SortItem } from "../components/Sort/Sort";
import { PizzaSkeleton } from "../components/PizzaCard/PizzaSkeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { categoriesFilter, categoriesSort } from "../store/slices/filterSlice";
import axios from "axios";

export interface HomeProps {
  searchValue: string;
}

export const Home = ({ searchValue }: HomeProps) => {
  const BASE_URL = "https://651ec03244a3a8aa4768f0df.mockapi.io/pizzas";

  const [pizzas, setPizzas] = useState<IPropsPizzaCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    categories: { categoriesName, categoryId },
    sort,
  } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `${BASE_URL}?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sort.sort}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  }, [categoryId, sort, currentPage]);

  const onClickCategories = (id: number) => {
    dispatch(categoriesFilter(id));
  };

  const onClickSort = (sort: SortItem) => {
    dispatch(categoriesSort(sort));
  };

  const onChangeCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          categoriesName={categoriesName}
          onClickCategories={onClickCategories}
        />
        <Sort sortValue={sort} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {/* {isLoading
          ? pizzas.map((_, i) => <PizzaSkeleton key={i} />)
          : pizzas
              .filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              ) //local search pizza from input
              .map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)} */}
        {isLoading
          ? pizzas.map((_, i) => <PizzaSkeleton key={i} />)
          : pizzas.flatMap((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase()) ? (
                <PizzaCard key={item.id} {...item} />
              ) : (
                []
              )
            )}
      </div>
      <Pagination onChangeCurrentPage={onChangeCurrentPage} />
    </>
  );
};
