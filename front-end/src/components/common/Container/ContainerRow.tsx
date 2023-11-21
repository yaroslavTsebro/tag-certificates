import React from "react";
import styles from "./Container.module.scss";
import { ContainerProps } from "./Container";

const ContainerRow: React.FC<ContainerProps> = ({ children, className = "" }) => {
  const containerClass = `${styles.row} ${className}`.trim();

  return <div className={containerClass}>{children}</div>;
};

export default ContainerRow;