import { FC } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Link } from "react-router-dom";

export interface IPropsPizzaCard {
  id: string;
  title: string;
  imageUrl: string;
  category: number;
  price: number;
  rating: number;
  sizes: number[];
  types: number[];
}

const typesName = ["thin", "default"];

export const PizzaCard: FC<IPropsPizzaCard> = (pizza) => {
  const { id, title, imageUrl, price, sizes, types } = pizza;

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const { addPizza } = useActions();
  const { itemsPizzas } = useAppSelector((state) => state.cart);
  const pizzaCount = itemsPizzas.find((item) => item.id === id);

  const onClickAddPizza = () => {
    const pizza = {
      id,
      title,
      price,
      imageUrl,
      type: typesName[activeType],
      sizes: sizes[activeSize],
      count: 0,
    };
    addPizza(pizza);
  };

  return (
    <div className="pizza-bloc-wrapper">
      <div className="pizza-block">
        <Link to={`pizza/${pizza.id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
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
          <div
            onClick={onClickAddPizza}
            className="button button--outline button--add"
          >
            <FaPlus className="button--plus" />
            <span>Add</span>
            {pizzaCount && <i>{pizzaCount.count}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};
