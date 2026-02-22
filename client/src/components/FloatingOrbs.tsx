import { motion } from "framer-motion";

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-transparent blur-3xl"
          animate={{
            x: [0, 100 - i * 30, 0],
            y: [0, -80 + i * 20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${20 + i * 20}%`,
            top: `${10 + i * 15}%`,
            zIndex: -1,
          }}
        />
      ))}
    </div>
  );
}
