import { Section } from '@/types';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  section: Section;
}

export const TestimonialsSection = ({ section }: TestimonialsSectionProps) => {
  const { title, content } = section;
  const testimonials = content.testimonials || [];

  return (
    <section className="py-24 dark-section">
      <div className="section-container">
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
            Hear from the people who make it all happen
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: { quote: string; author: string; role: string; avatar: string }, index: number) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-2xl bg-[hsl(220_20%_12%)] border border-[hsl(220_15%_20%)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/40" />
              
              <p className="text-lg leading-relaxed mb-6 relative z-10 text-[hsl(40_20%_90%)]">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-bold text-primary-foreground">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-bold text-[hsl(40_20%_95%)]">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-primary">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
