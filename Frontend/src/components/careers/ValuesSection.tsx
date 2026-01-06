import { Section } from '@/types';
import { StaggerList, StaggerItem } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { Rocket, Users, Lightbulb, Target, HelpCircle } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  '🚀': Rocket,
  '🤝': Users,
  '💡': Lightbulb,
  '🎯': Target,
};

interface ValuesSectionProps {
  section: Section;
}

export const ValuesSection = ({ section }: ValuesSectionProps) => {
  const { title, content } = section;
  const values = content.values || [];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-glow-gradient opacity-30 blur-3xl pointer-events-none" />
      
      <div className="section-container relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            The principles that guide everything we do
          </p>
        </motion.div>

        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value: { icon: string; title: string; description: string }, index: number) => {
            const Icon = ICON_MAP[value.icon] || HelpCircle;
            return (
              <StaggerItem key={index}>
                <motion.div
                  className="group p-8 rounded-2xl bg-card border border-border h-full card-hover"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </div>
    </section>
  );
};
