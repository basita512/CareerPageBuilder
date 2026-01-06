import { Section } from '@/types';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';

interface CTASectionProps {
  section: Section;
}

export const CTASection = ({ section }: CTASectionProps) => {
  const { title, content } = section;

  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
      
      <div className="section-container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
            {title}
          </h2>
          <p className="text-xl opacity-70 mb-10 leading-relaxed">
            {content.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {content.primaryCta && (
              <Button
                size="lg"
                className="text-lg px-8 py-6 glow"
                onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {content.primaryCta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
            {content.secondaryCta && (
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
              >
                <Mail className="mr-2 h-5 w-5" />
                {content.secondaryCta.text}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
