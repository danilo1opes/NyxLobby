import styles from './loading.module.css';

const Loading = ({ modal }: { modal?: boolean }) => {
  return (
    <div className={modal ? styles.wrapper : styles.wrapperNoModal}>
      <div className={styles.loading}>
        <svg
          width="46"
          height="40"
          viewBox="0 0 46 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" width="6" height="40" fill="#333">
            <animate
              attributeName="y"
              values="40;0"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              values="0;40;0"
              dur="1s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="20" width="6" height="40" fill="#333">
            <animate
              attributeName="y"
              values="40;0"
              dur="1s"
              begin="0.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              values="0;40;0"
              dur="1s"
              begin="0.2s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="34" width="6" height="40" fill="#333">
            <animate
              attributeName="y"
              values="40;0"
              dur="1s"
              begin="0.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              values="0;40;0"
              dur="1s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
