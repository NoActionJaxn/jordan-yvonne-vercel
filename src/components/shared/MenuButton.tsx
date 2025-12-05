import { motion } from "motion/react";

export interface MenuButtonProps {
  onClick?: () => void;
  isOpen?: boolean;
}

export default function MenuButton({ onClick, isOpen }: MenuButtonProps) {
  return (
    <button onClick={onClick} className="sm:hidden z-50 flex items-center justify-center fixed top-10 right-10 cursor-pointer size-15 rounded-full bg-amber-950 text-amber-50 hover:bg-amber-800 transition-colors ease-in-out duration-300">
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-amber-100"
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <motion.rect
          x="2"
          y="5"
          width="20"
          height="2"
          variants={{
            closed: { rotate: 0, translateY: 0, opacity: 1, height: 2 },
            open: { rotate: 45, translateY: 6, opacity: 1, height: 3 },
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
        <motion.rect
          x="2"
          y="12"
          width="20"
          height="2"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
        <motion.rect
          x="2"
          width="20"
          height="2"
          variants={{
            closed: { rotate: 0, translateY: 0, opacity: 1, height: 2, y: 19 },
            open: { rotate: -45, translateY: -6, opacity: 1, height: 3, y: 17},
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </motion.svg>
      <span className="sr-only">Menu</span>
    </button>
  );
}