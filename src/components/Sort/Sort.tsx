import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export interface SortItem {
  name: string;
  sort: string;
}

interface SortProps {
  sortValue: SortItem;
  onClickSort: (sort: SortItem) => void;
}

export const Sort = ({ sortValue, onClickSort }: SortProps) => {
  const menu = [
    { name: "popularity", sort: "rating" },
    { name: "price", sort: "price" },
    { name: "alphabetizing", sort: "title" },
  ];

  const [isVisible, setIsVisible] = useState(false);

  // const keyEvent = (event: React.KeyboardEvent) => {
  //   if(event.key === 'Esc') console.log(12);
  //   ;
  // }

  const handleSelectMenu = (sort: SortItem) => {
    onClickSort(sort);
    setIsVisible(false);
  };

  return (
    <div className="sort">
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
                // onKeyDown={keyEvent}
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
};
