import { useContext } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { SearchContext } from "../../App";
import styles from "./Search.module.scss";

export const Search = () => {
  const {searchValue, setSearchValue } = useContext(SearchContext);
  const onSearch = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    setSearchValue!(currentTarget.value);
  };

  const clearInput = () => {
    setSearchValue!("");
  };

  return (
    <div className={styles.container}>
      <HiSearch className={styles.icon} />
      <input
        value={searchValue}
        type="search"
        placeholder="Search pizza..."
        className={styles.input}
        onChange={onSearch}
      />
      {searchValue && <HiX className={styles.iconClose} onClick={clearInput} />}
    </div>
  );
};
