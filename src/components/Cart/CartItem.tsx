import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";

export const CartItem = () => {
  const { removePizza, addPizza, minusPizza } = useActions();
  const { itemsPizzas } = useAppSelector((state) => state.cart);

  return itemsPizzas.map((item) => (
    <div key={item.title} className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={item.imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{item.title}</h3>
        <p>{item.type}, {item.sizes} sm</p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={() => minusPizza(item.id)}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <FaMinus />
        </div>
        <b>{item.count}</b>
        <div
          onClick={() => addPizza(item)}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <FaPlus />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{item.price * item.count} $</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={() => removePizza(item)}
          className="button button--outline button--circle"
        >
          <FaTimes />
        </div>
      </div>
    </div>
  ));
};
