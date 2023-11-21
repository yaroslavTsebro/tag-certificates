import styles from "./Highlighted.module.scss";
import { HighlightedProps } from "./Highlighted";

const HighlightedSmall: React.FC<HighlightedProps> = ({
  children,
  className = "",
}) => {
  const containerClass =
    `${styles.highlighted} ${styles.highlightedSmall} ${className}`.trim();

  return <em className={containerClass}>{children}</em>;
};

export default HighlightedSmall;
