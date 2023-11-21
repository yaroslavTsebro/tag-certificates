import React from "react";
import styles from "./Container.module.scss";
import { ContainerProps } from "./Container";

const ContainerBody: React.FC<ContainerProps> = ({ children, className = "" }) => {
  const containerClass = `${styles.body} ${className}`.trim();

  return <div className={containerClass}>{children}</div>;
};

export default ContainerBody;
