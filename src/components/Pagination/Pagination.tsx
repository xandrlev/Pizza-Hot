import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

export interface IPaginationProps {
  onChangeCurrentPage: (page: number) => void;
}

export const Pagination = ({ onChangeCurrentPage }: IPaginationProps) => {
  return (
    <>
      <ReactPaginate
        className={styles.paginate}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangeCurrentPage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
