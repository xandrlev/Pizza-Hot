import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import { LuShoppingCart } from "react-icons/lu";
import { Search } from "../Search/Search";

export const Header = () => {
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
        <Search />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>15 $</span>
            <div className="button__delimiter"></div>
            <LuShoppingCart />
            <span>1</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
