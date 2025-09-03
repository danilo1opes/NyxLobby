import React from 'react';
import styles from '@/components/forms/button.module.css';

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonType) => {
  return (
    <button {...props} className={styles.button}>
      <span className={styles.button_lg}>
        <span className={styles.button_sl}></span>
        <span className={styles.button_text}>{children}</span>
      </span>
    </button>
  );
};

export default Button;
