import { Section } from '@/types';
import { StaggerList, StaggerItem } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { 
  Banknote, 
  Stethoscope, 
  Home, 
  BookOpen, 
  Plane, 
  Baby, 
  HelpCircle 
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  '💰': Banknote,
  '🏥': Stethoscope,
  '🏠': Home,
  '📚': BookOpen,
  '✈️': Plane,
  '👶': Baby,
};

interface BenefitsSectionProps {
  section: Section;
}

export const BenefitsSection = ({ section }: BenefitsSectionProps) => {
  const { title, content } = section;
  const benefits = content.benefits || [];

  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }} 
      />
      
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
          <p className="text-lg opacity-70">
            We take care of our team so they can do their best work
          </p>
        </motion.div>

        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit: { icon: string; title: string; description: string }, index: number) => {
            const Icon = ICON_MAP[benefit.icon] || HelpCircle;
            return (
              <StaggerItem key={index}>
                <motion.div
                  className="group p-6 rounded-xl bg-[hsl(220_20%_12%/0.8)] backdrop-blur-sm border border-[hsl(220_15%_25%/0.5)] h-full"
                  whileHover={{ scale: 1.02, borderColor: 'hsl(160 70% 45% / 0.5)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold mb-2 text-[hsl(40_20%_95%)]">
                        {benefit.title}
                      </h3>
                      <p className="text-[hsl(40_10%_70%)] text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </div>
    </section>
  );
};
