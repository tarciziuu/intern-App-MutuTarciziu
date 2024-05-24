import CardManager from './cardManager';
import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.welcomeMsg}>Welcome!</h1>
      <CardManager />
    </div>
  );
};

export default Home;
