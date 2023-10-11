import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export interface IPropsPizzaCard {
  id: number;
  title: string;
  imageUrl: string;
  category: number;
  price: number;
  rating: number;
  sizes: number[];
  types: number[];
}

export const PizzaCard = ({
  id,
  title,
  imageUrl,
  category,
  price,
  rating,
  sizes,
  types,
}: IPropsPizzaCard) => {
  const typesName = ["thin", "default"];
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  return (
    <div className="pizza-bloc-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((item) => (
              <li
                key={item}
                onClick={() => setActiveType(item)}
                className={activeType === item ? "active" : ""}
              >
                {typesName[item]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((item, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? "active" : ""}
              >
                {item} sm
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price}$</div>
          <div className="button button--outline button--add">
            <FaPlus className="button--plus"/>
            <span>Add</span>
            <i>2</i>
          </div>
        </div>
      </div>
    </div>
  );
};
