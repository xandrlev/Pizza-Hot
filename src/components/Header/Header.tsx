import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import { LuShoppingCart } from "react-icons/lu";
import { Search } from "../Search/Search";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useRef } from "react";

export const Header = () => {
  const { itemsPizzas, totalPrice } = useAppSelector((state) => state.cart);
  const totalPizzas = itemsPizzas.reduce((sum, cur) => sum + cur.count, 0);
  const location = useLocation();

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(itemsPizzas);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [itemsPizzas]);

  return (
    <header className="header">
      <div className="container">
        <Link className="header__logo" to="/">
          <img src={logo} alt="logo" />
          <div>
            <h1>Pizza hot</h1>
            <p>delicious pizza</p>
          </div>
        </Link>
        {location.pathname === `/` && (
          <div className="header__search">
            <Search />
          </div>
        )}
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} $</span>
            <div className="button__delimiter"></div>
            <LuShoppingCart />
            <span>{totalPizzas}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
