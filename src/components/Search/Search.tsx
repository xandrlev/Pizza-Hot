import { HiSearch, HiX } from "react-icons/hi";
import styles from "./Search.module.scss";

export interface SearchProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Search = ({ searchValue, setSearchValue }: SearchProps) => {
  const onSearch = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(currentTarget.value);
  };

  const clearInput = () => {
    setSearchValue("");
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
