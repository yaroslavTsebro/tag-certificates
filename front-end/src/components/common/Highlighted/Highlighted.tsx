import React from "react";
import styles from "./Highlighted.module.scss";
import HighlightedBig from "./HighlightedBig";
import HighlightedSmall from "./HighlightedSmall";

export type HighlightedProps = {
  children: React.ReactNode;
  className?: string;
};

type HighlightedComponent = React.FC<HighlightedProps> & {
  Big: typeof HighlightedBig;
  Small: typeof HighlightedSmall;
};

const Highlighted: HighlightedComponent = ({ children, className = "" }) => {
  const containerClass = `${styles.highlighted} ${className}`.trim();

  return <em className={containerClass}>{children}</em>;
};

Highlighted.Big = HighlightedBig;
Highlighted.Small = HighlightedSmall;

export default Highlighted;
