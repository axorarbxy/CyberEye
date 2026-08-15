import { motion } from "framer-motion";

function BlurText({ text, delay = 0.08, className = "", style = {} }) {
  const words = text.split(" ");

  return (
    <span className={className} style={{ display: "inline-block", ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.5, delay: i * delay, ease: "easeOut" }}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default BlurText;
