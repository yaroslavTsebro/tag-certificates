import styles from "./Highlighted.module.scss";
import { HighlightedProps } from "./Highlighted";

const HighlightedBig: React.FC<HighlightedProps> = ({
  children,
  className = "",
}) => {
  const containerClass = `${styles.highlighted} ${styles.highlightedBig} ${className}`.trim();

  return <em className={containerClass}>{children}</em>;
};

export default HighlightedBig;