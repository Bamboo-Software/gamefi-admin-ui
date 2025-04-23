export const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };
  
export const glowVariants = {
    glow: {
      boxShadow: [
        "0 0 10px rgba(139, 92, 246, 0.5)",
        "0 0 20px rgba(99, 102, 241, 0.8)",
        "0 0 10px rgba(139, 92, 246, 0.5)",
      ],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
  };
  
export const titleVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { duration: 4, repeat: Infinity, ease: "linear" },
    },
  };