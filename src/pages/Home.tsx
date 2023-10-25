import { useEffect, useRef, useState } from "react";
import qs from "qs";
import { useDebounce } from "../hooks/debounce";
import { Categories } from "../components/Categories/Categories";
import { IPropsPizzaCard, PizzaCard } from "../components/PizzaCard/PizzaCard";
import { Sort, SortItem, menu } from "../components/Sort/Sort";
import { PizzaSkeleton } from "../components/PizzaCard/PizzaSkeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  categoriesFilter,
  categoriesSort,
  setCurrentPage,
  setFilters,
} from "../store/slices/filterSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface HomeProps {
  searchValue: string;
}

export const Home = ({ searchValue }: HomeProps) => {
  const BASE_URL = "https://651ec03244a3a8aa4768f0df.mockapi.io/pizzas";

  const debounceSearch = useDebounce(searchValue);
  const [pizzas, setPizzas] = useState<IPropsPizzaCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false); //запрос по URL
  const isMounted = useRef(false); //проверка первого рендера один раз, а не два
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { categoriesName, categoryId, sort, currentPage } = useSelector(
    (state: RootState) => state.filter
  );

  useEffect(() => {
    if (!isSearch.current) {
      setIsLoading(true);
      axios
        .get(
          `${BASE_URL}?page=${currentPage}&limit=4&${
            categoryId > 0 ? `category=${categoryId}` : ""
          }&sortBy=${sort.sort}&search=${debounceSearch}`
        )
        .then((res) => {
          setPizzas(res.data);
          setIsLoading(false);
        });
    }
    isSearch.current = false;
  }, [categoryId, sort.sort, currentPage, debounceSearch]);

  //* загрузка по готовой ссылке
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = menu.find((item) => item.sort === params.sort);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
    isSearch.current = true;
  }, []);

  //* получение ссылки
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sort,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sort, currentPage]);

  const onClickCategories = (id: number) => {
    dispatch(categoriesFilter(id));
  };

  const onClickSort = (sort: SortItem) => {
    dispatch(categoriesSort(sort));
  };

  const onChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page));
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
        {isLoading
          ? pizzas.map((_, i) => <PizzaSkeleton key={i} />)
          : pizzas.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)}

        {/* 
        //* local search pizza from input
        {isLoading
          ? pizzas.map((_, i) => <PizzaSkeleton key={i} />)
          : pizzas.flatMap((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase()) ? (
                <PizzaCard key={item.id} {...item} />
              ) : (
                []
              )
            )} */}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangeCurrentPage={onChangeCurrentPage}
      />
    </>
  );
};
