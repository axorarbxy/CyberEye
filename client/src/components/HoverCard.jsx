import { motion } from "framer-motion";

function HoverCard({ children, style = {} }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: "0 12px 24px rgba(57, 255, 20, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        border: "1px solid var(--border)",
        borderRadius: "10px",
        background: "var(--bg-panel)",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export default HoverCard;
