import { Section } from '@/types';
import { MotionDiv, StaggerList, StaggerItem } from '@/components/ui/motion';

interface AboutSectionProps {
  section: Section;
}

export const AboutSection = ({ section }: AboutSectionProps) => {
  const { title, content } = section;
  const stats = content.stats || [];

  return (
    <section className="py-24 bg-card">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <MotionDiv>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.description}
            </p>
          </MotionDiv>

          <StaggerList className="grid grid-cols-2 gap-6">
            {stats.map((stat: { label: string; value: string }, index: number) => (
              <StaggerItem key={index}>
                <div className="p-6 rounded-2xl bg-background border border-border card-hover">
                  <div className="text-4xl sm:text-5xl font-display font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </div>
    </section>
  );
};
