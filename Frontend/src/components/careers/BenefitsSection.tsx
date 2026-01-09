import { Section } from '@/types';
import { motion } from 'framer-motion';
import {
  Banknote,
  Stethoscope,
  Home,
  BookOpen,
  Plane,
  Baby,
  HelpCircle,
  Flower2,
  Palmtree
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ICON_MAP: Record<string, any> = {
  'money': Banknote,
  'health': Stethoscope,
  'remote': Home,
  'learning': BookOpen,
  'travel': Plane,
  'family': Baby,
  'wellness': Flower2,
  'pto': Palmtree,
};

interface BenefitsSectionProps {
  section: Section;
}

export const BenefitsSection = ({ section }: BenefitsSectionProps) => {
  const { title, content } = section;
  const benefits = content.benefits || [];

  return (
    <section className="py-24 relative overflow-hidden bg-accent/5">
      {/* Subtle modern background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-50" />

      <div className="section-container relative z-10">
        <SectionHeading
          title={title}
          description="We take care of our team so they can do their best work."
        />

        {/* Centered Vertical List Layout */}
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {benefits.map((benefit: { icon: string; title: string; description: string }, index: number) => {
            const Icon = ICON_MAP[benefit.icon] || HelpCircle;

            return (
              <motion.div
                key={index}
                className="group flex items-center gap-6 p-4 rounded-2xl border border-border bg-card/80 dark:bg-card/20 backdrop-blur-xl hover:bg-card/50 dark:hover:bg-card/30 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                {/* Icon Container */}
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Text Content */}
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-display font-bold text-foreground mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
