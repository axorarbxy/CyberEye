import { motion } from "framer-motion";

function AnimatedButton({ children, onClick, disabled = false, style = {}, type = "button" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{
        padding: "10px 24px",
        cursor: disabled ? "not-allowed" : "pointer",
        borderRadius: "8px",
        border: "none",
        background: "var(--accent)",
        color: "#fff",
        fontWeight: 600,
        fontSize: "14px",
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

export default AnimatedButton;
