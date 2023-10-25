import { LuShoppingCart } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";
import { CartItem } from "../components/Cart/CartItem";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useActions } from "../hooks/useActions";
import { CartEmpty } from "../components/Cart/CartEmpty";

export const Cart = () => {
  const { clearPizza } = useActions();
  const { itemsPizzas, totalPrice } = useAppSelector((state) => state.cart);

  if (!totalPrice) return <CartEmpty />;

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <LuShoppingCart />
            Cart
          </h2>
          <div className="cart__clear">
            <FiTrash2 />
            <span onClick={() => clearPizza()}>Clear cart</span>
          </div>
        </div>
        <div className="content__items">
          <CartItem />
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Total pizzas:{" "}
              <b>
                {itemsPizzas.reduce((sum, cur) => sum + cur.count, 0)} pieces
              </b>
            </span>
            <span>
              Total: <b>{totalPrice} $</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <span>Back</span>
            </Link>
            <div className="button pay-btn">
              <span>Order now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
