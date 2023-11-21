import React from "react";
import styles from "./Container.module.scss";
import ContainerBody from "./ContainerBody";
import ContainerRow from "./ContainerRow";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string; 
};

type ContainerComponent = React.FC<ContainerProps> & {
  Body: typeof ContainerBody;
  Row: typeof ContainerRow;
};


const Container: ContainerComponent = ({ children, className ="" }) => {

  const containerClass = `${styles.wrapper} ${className}`.trim();

  return <div className={containerClass}>{children}</div>;
};

Container.Body = ContainerBody;
Container.Row = ContainerRow;

export default Container;
