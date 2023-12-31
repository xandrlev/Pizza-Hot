import { FC } from "react";
import { Link } from "react-router-dom";
import empty from '../../assets/image/empty.png'
import styles from "./CartEmpty.module.scss";

export const CartEmpty: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.empty}>
        <img src={empty} alt="empty" />
        <h2>CART IS EMPTY</h2>
      </div>
      <Link to="/" className="button button--cart">
        Back to home
      </Link>
    </div>
  );
};
