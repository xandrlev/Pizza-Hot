import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

export interface IPaginationProps {
  currentPage: number,
  onChangeCurrentPage: (page: number) => void;
}

export const Pagination = ({ onChangeCurrentPage, currentPage }: IPaginationProps) => {
  return (
    <>
      <ReactPaginate
        className={styles.paginate}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangeCurrentPage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
