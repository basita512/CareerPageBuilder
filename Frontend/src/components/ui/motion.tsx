import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { ReactNode } from 'react';

// Animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Motion components with common configurations
interface MotionSectionProps extends HTMLMotionProps<'section'> {
  children: ReactNode;
}

export const MotionSection = ({ children, ...props }: MotionSectionProps) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={fadeInUp}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    {...props}
  >
    {children}
  </motion.section>
);

interface MotionDivProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
}

export const MotionDiv = ({ children, delay = 0, ...props }: MotionDivProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={fadeInUp}
    transition={{ duration: 0.5, ease: 'easeOut', delay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const MotionCard = ({ children, delay = 0, ...props }: MotionDivProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={scaleIn}
    transition={{ duration: 0.4, ease: 'easeOut', delay }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    {...props}
  >
    {children}
  </motion.div>
);

// Stagger list animation
interface StaggerListProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

export const StaggerList = ({ children, ...props }: StaggerListProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={staggerContainer}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, ...props }: MotionDivProps) => (
  <motion.div variants={staggerItem} transition={{ duration: 0.4 }} {...props}>
    {children}
  </motion.div>
);

// Page transition wrapper
interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Export motion for custom usage
export { motion };
