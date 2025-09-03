import Image from 'next/image';
import styles from './footer.module.css';

export default async function Footer() {
  return (
    <footer className={styles.footer}>
      <Image
        src="/assets/fav.svg"
        width={28}
        height={22}
        alt="Lobby"
        priority
      />
      <p>Lobby. Alguns direitos reservados.</p>
    </footer>
  );
}
