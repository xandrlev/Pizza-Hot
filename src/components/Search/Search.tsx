import { FC } from "react";
import { useRef } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";
import styles from "./Search.module.scss";

export const Search: FC = () => {
  const { searchValue } = useAppSelector((state) => state.filter);
  const { setSearchValue } = useActions();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(currentTarget.value);
  };

  const clearInput = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      <HiSearch className={styles.icon} />
      <input
        ref={inputRef}
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
