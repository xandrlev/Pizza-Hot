import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { NotFound } from "./pages/NotFound";
import "./scss/app.scss";

export interface ISearchProps<T> {
  searchValue: T;
  setSearchValue: React.Dispatch<React.SetStateAction<T>>;
}

export const SearchContext = createContext<Partial<ISearchProps<string>>>({});

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home searchValue={searchValue} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
