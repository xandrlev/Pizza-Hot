import { FC, memo } from "react";
import { useEffect, useRef, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export interface SortItem {
  name: "popularity" | "price" | "alphabetizing";
  sort: "rating" | "price" | "title";
}

export interface SortProps {
  sortValue: SortItem;
  onClickSort: (sort: SortItem) => void;
}
export const menu: SortItem[] = [
  { name: "popularity", sort: "rating" },
  { name: "price", sort: "price" },
  { name: "alphabetizing", sort: "title" },
];

export const Sort: FC<SortProps> = memo(({ sortValue, onClickSort }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null!);

  const handleSelectMenu = (sort: SortItem) => {
    onClickSort(sort);
    setIsVisible(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!e.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };
    document.addEventListener("keyup", closeByEsc);
    return () => document.removeEventListener("keyup", closeByEsc);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        {isVisible ? <AiFillCaretDown /> : <AiFillCaretUp />}
        <b>Sorting by:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sortValue.name}</span>
      </div>

      {isVisible && (
        <div className="sort__popup">
          <ul>
            {menu.map((item) => (
              <li
                key={item.name}
                onClick={() => handleSelectMenu(item)}
                className={sortValue.sort === item.sort ? "active" : ""}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
