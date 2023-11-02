import { useNavigate } from "react-router-dom";
import notFoundImg from "../../assets/image/404.png";
import styles from "./NotFound.module.scss";

export const NotFoundComp = () => {
const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.notFound}>
        <span className={styles.four}>4</span>
        <img src={notFoundImg} alt="0" />
        <span className={styles.four}>4</span>
      </div>
      <h2>PAGE NOT FOUND</h2>
      <button onClick={() => navigate(-1)} className="button button--cart">Go back</button>
    </div>
  );
};
