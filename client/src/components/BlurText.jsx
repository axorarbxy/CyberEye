import { motion, useReducedMotion } from "framer-motion";

function BlurText({
  text,
  as: Tag = "span",
  delay = 0.06,
  duration = 0.5,
  blur = 8,
  y = 8,
  once = true,
  className = "",
  style = {},
}) {
  const prefersReducedMotion = useReducedMotion();

  // Preserve original spacing/punctuation instead of collapsing multiple spaces
  const words = text.split(/(\s+)/);

  // If the user prefers reduced motion, render plain text immediately —
  // content is never gated behind animation completing.
  if (prefersReducedMotion) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      style={{ display: "inline-block", ...style }}
      aria-label={text}
    >
      {words.map((word, i) => {
        // Whitespace segments render as plain text, not animated spans,
        // so screen readers and text selection behave normally.
        if (/^\s+$/.test(word)) {
          return <span key={i}>{word}</span>;
        }
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0, filter: `blur(${blur}px)`, y }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration,
              delay: i * delay,
              ease: "easeOut",
            }}
            style={{ display: "inline-block", willChange: "opacity, filter, transform" }}
          >
            {word}
          </motion.span>
        );
      })}
    </Tag>
  );
}

export default BlurText;
