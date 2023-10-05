import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export const Sort = () => {
  const menu = ["popularity", "price", "alphabetizing"];
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(0);

  // const keyEvent = (event: React.KeyboardEvent) => {
  //   if(event.key === 'Esc') console.log(12);
  //   ;
  // }

  const handleSelectMenu = (index: number) => {
    setSelectedMenu(index);
    setIsVisible(false);
  };
  

  return (
    <div className="sort">
      <div className="sort__label">
        {isVisible ? <AiFillCaretDown /> : <AiFillCaretUp />}
        <b>Sorting by:</b>
        <span onClick={() => setIsVisible(!isVisible)}>
          {menu[selectedMenu]}
        </span>
      </div>

      {isVisible && (
        <div className="sort__popup">
          <ul>
            {menu.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelectMenu(index)}
                // onKeyDown={keyEvent}
                className={selectedMenu === index ? "active" : ""}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
