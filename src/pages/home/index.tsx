import CardManager from './cardManager';
import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.home__container}>
      <h1 className={styles.welcome__msg}>Welcome!</h1>
      <CardManager />
    </div>
  );
};

export default Home;
