import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
    title: string;
    description?: string;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export const SectionHeading = ({
    title,
    description,
    className,
    align = 'center'
}: SectionHeadingProps) => {
    return (
        <div className={cn("relative mb-16", align === 'center' ? "text-center" : `text-${align}`, className)}>
            <motion.h2
                className="text-4xl sm:text-5xl font-display font-bold mb-6 tracking-tight text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {title}
            </motion.h2>

            {/* Animated Underline */}
            <motion.div
                className={cn(
                    "h-1.5 bg-primary rounded-full mb-6",
                    align === 'center' ? "mx-auto" : align === 'right' ? "ml-auto" : "mr-auto" // Simplifies alignment logic
                )}
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 80, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            />

            {description && (
                <motion.p
                    className={cn(
                        "text-lg text-muted-foreground max-w-2xl",
                        align === 'center' ? "mx-auto" : ""
                    )}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {description}
                </motion.p>
            )}
        </div>
    );
};
