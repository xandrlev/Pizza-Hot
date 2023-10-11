import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import { LuShoppingCart } from "react-icons/lu";
import { Search, SearchProps } from "../Search/Search";

export const Header = ({ searchValue, setSearchValue }: SearchProps) => {
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
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>12 $</span>
            <div className="button__delimiter"></div>
            <LuShoppingCart />
            <span>3</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
