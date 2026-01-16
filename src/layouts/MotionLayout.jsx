// src/layouts/MotionLayout.jsx
import { motion } from "framer-motion";

const MotionLayout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 40,
        duration: 0.6,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default MotionLayout;
