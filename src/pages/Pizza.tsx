import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pizzas } from "../store/slices/pizzaSlice";
import styles from "./Pizza.module.scss";

export const Pizza = () => {
  const typesName = ["thin", "default"];
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState({} as Pizzas);

  const fetchData = async () => {
    try {
      const { data } = await axios.get<Pizzas>(
        `https://651ec03244a3a8aa4768f0df.mockapi.io/pizzas/${id}`
      );
      setPizza(data);
    } catch (error) {
      navigate("/");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className={styles.grid}>
        <img src={pizza.imageUrl} alt={pizza.title} />
        <div className={styles.right}>
          <div className={styles.right__title}>{pizza.title}</div>
          <div className={styles.desc}>
            <div className={styles.desc__item}>
              <div className={styles.desc__item_prop}>size:</div>
              <div className={styles.desc__item_value}>{pizza.sizes} sm</div>

              {/* {pizza.sizes.map((item, i) => (
                <div key={i} className={styles.desc__item_value}>
                  {item}sm{" "}
                </div>
              ))} */}
            </div>
            <div className={styles.desc__item}>
              <div className={styles.desc__item_prop}>dough:</div>

              <div className={styles.desc__item_value}>{typesName}</div>
              {/* {pizza.types.map((item, i) => (
                <div key={i} className={styles.desc__item_value}>
                  {typesName[item]}
                </div>
              ))} */}
            </div>
            <div className={styles.desc__item}>
              <div className={styles.desc__item_prop}>price:</div>
              <div className={styles.desc__item_value}>{pizza.price} $</div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/" className="button go-back-btn">
        <span>Back to home</span>
      </Link>
    </div>
  );
};
