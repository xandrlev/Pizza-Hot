import { Link } from "react-router-dom";
import styles from "./CartEmpty.module.scss";
import empty from '../../assets/image/empty.png'

export const CartEmpty = () => {
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
