import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pizzas } from "../store/slices/pizzaSlice";
import { FaPlus } from "react-icons/fa";
import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/useAppSelector";
import styles from "./Pizza.module.scss";

export const Pizza = () => {
  const typesName = ["thin", "classic"];
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState({} as Pizzas);
  const { addPizza } = useActions();
  const { itemsPizzas } = useAppSelector((state) => state.cart);
  const pizzaCount = itemsPizzas.find((item) => item.id === id);

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const fetchData = async () => {
    try {
      const { data } = await axios.get<Pizzas>(
        `https://651ec03244a3a8aa4768f0df.mockapi.io/pizzas/${id}`
      );
      setPizza(data);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickAddPizza = () => {
    addPizza({
      ...pizza,
      type: typesName[activeType],
      sizes: pizza.sizes[activeSize],
      count: 0,
    });
  };

  return (
    <div className={styles.grid}>
      <img src={pizza.imageUrl} alt={pizza.title} />
      <div className={styles.right}>
        <div className={styles.right__title}>{pizza.title}</div>
        <div className={styles.desc}>
          <div className={styles.desc__item}>
            {pizza.types &&
              pizza.types.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActiveType(item)}
                  className={
                    activeType === item
                      ? styles.desc__item_active
                      : styles.desc__item_value
                  }
                >
                  {typesName[+item]}
                </div>
              ))}
          </div>
          <div className={styles.desc__item}>
            {pizza.sizes &&
              pizza.sizes.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActiveSize(i)}
                  className={
                    activeSize === i
                      ? styles.desc__item_active
                      : styles.desc__item_value
                  }
                >
                  {item} sm{" "}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.price}>{pizza.price} $</div>

      <div className={styles.add} onClick={onClickAddPizza}>
        <FaPlus />
        <span>Add</span>
        {pizzaCount && <i>{pizzaCount.count}</i>}
      </div>

      <button onClick={() => navigate(-1)} className={styles.back}>
        <span>Go back</span>
      </button>
    </div>
  );
};
