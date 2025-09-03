import Link from 'next/link';
import styles from '@/components/link/link.module.css';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function LinkButton({
  href,
  children,
  className = '',
}: LinkButtonProps) {
  return (
    <Link href={href} className={`${styles.linkButton} ${className}`}>
      <span className={styles.button_lg}>
        <span className={styles.button_sl}></span>
        <span className={styles.button_text}>{children}</span>
      </span>
    </Link>
  );
}
