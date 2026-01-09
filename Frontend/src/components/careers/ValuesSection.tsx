import { Section } from '@/types';
import { StaggerList, StaggerItem } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import {
  Rocket, Users, Lightbulb, Target, HelpCircle,
  Shield, Star, Heart, TrendingUp, Globe, Smile,
  Award, Zap, Eye, CheckCircle2
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

// Map specific keywords/emojis to Lucide icons
const ICON_MAP: Record<string, any> = {
  // Direct matches
  'rocket': Rocket,
  'users': Users,
  'lightbulb': Lightbulb,
  'target': Target,

  // Value Keywords
  'innovation': Lightbulb,
  'creative': Lightbulb,
  'creativity': Lightbulb,

  'collaboration': Users,
  'teamwork': Users,
  'together': Users,
  'inclusive': Users,

  'excellence': Star,
  'quality': Star,
  'mastery': Award,

  'integrity': Shield,
  'trust': Shield,
  'honest': Shield,
  'security': Shield,

  'growth': TrendingUp,
  'learning': TrendingUp,
  'development': TrendingUp,

  'diversity': Globe,
  'global': Globe,
  'community': Globe,

  'passion': Heart,
  'empathy': Heart,
  'care': Heart,

  'customer': Smile,
  'fun': Smile,
  'joy': Smile,

  'transparency': Eye,
  'openness': Eye,

  'impact': Zap,
  'agility': Zap,
  'speed': Rocket,

  'accountability': CheckCircle2,
  'ownership': CheckCircle2,
};

interface ValuesSectionProps {
  section: Section;
}

export const ValuesSection = ({ section }: ValuesSectionProps) => {
  const { title, content } = section;
  const values = content.values || [];

  const getIcon = (value: { icon?: string; title?: string }) => {
    // 1. Try exact match on 'icon' field
    if (value.icon && ICON_MAP[value.icon.toLowerCase()]) {
      return ICON_MAP[value.icon.toLowerCase()];
    }
    // 2. Try partial/keyword match on 'title'
    if (value.title) {
      const titleLower = value.title.toLowerCase();
      // Look for any key in ICON_MAP that appears in the title
      const matchedKey = Object.keys(ICON_MAP).find(key => titleLower.includes(key));
      if (matchedKey) return ICON_MAP[matchedKey];
    }
    // 3. Fallback
    return HelpCircle;
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-glow-gradient opacity-30 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          title={title}
          description="The principles that guide everything we do"
        />

        <StaggerList className="flex flex-wrap justify-center gap-6">
          {values.map((value: { icon: string; title: string; description: string }, index: number) => {
            const Icon = getIcon(value);
            return (
              <StaggerItem key={index}>
                <motion.div
                  className="group relative p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/50 h-full card-hover flex flex-col items-start text-left w-full md:w-[350px] overflow-hidden"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Bottom-right Gradient Background - visible by default, plain on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="mb-6 p-3 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 w-fit">
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3 text-card-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
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
