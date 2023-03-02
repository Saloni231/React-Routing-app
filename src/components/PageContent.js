import React from "react";
import styles from "./PageContent.module.css";

const PageContent = ({ title, children }) => {
  return (
    <div className={styles.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default PageContent;
