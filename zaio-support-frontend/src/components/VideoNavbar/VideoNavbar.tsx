import styles from "./VideoNavbar.module.css";
export const VideoNavbar = () => {
  return (
    <div
      className={`${styles.navbar} w-100 d-flex flex-column align-items-start justify-content-center ps-4`}
    >
      <img
        src="./zaio-logo-light.png"
        alt="logo"
        className={`${styles.logo}`}
      />
    </div>
  );
};
