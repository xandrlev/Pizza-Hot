import { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

export interface IPaginationProps {
  currentPage: number;
  onChangeCurrentPage: (page: number) => void;
}

export const Pagination: FC<IPaginationProps> = ({
  onChangeCurrentPage,
  currentPage,
}) => {
  return (
    <>
      <ReactPaginate
        className={styles.paginate}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangeCurrentPage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={2}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
