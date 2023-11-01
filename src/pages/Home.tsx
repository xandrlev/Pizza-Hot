import qs from "qs";
import { FC, useCallback, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/debounce";
import { Categories } from "../components/Categories/Categories";
import { PizzaCard } from "../components/PizzaCard/PizzaCard";
import { Sort, SortItem, menu } from "../components/Sort/Sort";
import { PizzaSkeleton } from "../components/PizzaCard/PizzaSkeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useActions } from "../hooks/useActions";

export const Home: FC = () => {
  const isSearch = useRef(false); //запрос по URL
  const isMounted = useRef(false); //проверка первого рендера один раз, а не два
  const navigate = useNavigate();
  const location = useLocation();

  const {
    setFilters,
    categoriesFilter,
    categoriesSort,
    setCurrentPage,
    fetchPizza,
  } = useActions();
  const { categoriesName, categoryId, currentPage, sort, searchValue } =
    useAppSelector((state) => state.filter);
  const { pizzas, status } = useAppSelector((state) => state.pizza);
  const debounceSearch = useDebounce(searchValue);

  const fetchData = async () => {
    fetchPizza({ currentPage, categoryId, sort, debounceSearch });
  };

  useEffect(() => {
    if (!isSearch.current) fetchData();
    isSearch.current = false;
  }, [categoryId, sort.sort, currentPage, debounceSearch]);

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

  //* загрузка по готовой ссылке
  useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.substring(1));
      const sort = menu.find((item) => item.sort === params.sort);

      setFilters({
        ...params,
        sort,
      });
    }
    isSearch.current = true;
  }, []);

  const onClickCategories = useCallback((id: number) => {
    categoriesFilter(id);
  }, []);

  const onClickSort = useCallback((sort: SortItem) => {
    categoriesSort(sort);
  }, []);

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
        {status === "loading"
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
