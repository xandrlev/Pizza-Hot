import { Route, Routes } from "react-router-dom";
import { Categories } from "./components/Categories/Categories";
import { Header } from "./components/Header/Header";
import { PizzaCard } from "./components/PizzaCard/PizzaCard";
import { Cart } from "./pages/Cart";
import { Sort } from "./components/Sort/Sort";
import Pizza from "./assets/pizzas.json";
import "./scss/app.scss";

function App() {
  const BASE_URL = "https://651ec03244a3a8aa4768f0df.mockapi.io/pizzas";
  const { pizzas } = Pizza;

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/card" element={<Cart />} />
      </Routes>

      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {pizzas.map((pizza) => (
              <PizzaCard key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
