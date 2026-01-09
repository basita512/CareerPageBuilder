import { Section, Company } from '@/types';
import { MotionDiv, StaggerList, StaggerItem } from '@/components/ui/motion';

interface AboutSectionProps {
  section: Section;
  company?: Company;
}

export const AboutSection = ({ section, company }: AboutSectionProps) => {
  const { title, content } = section;
  const stats = content.stats || [];
  const bannerUrl = company?.bannerUrl;

  return (
    <section className="py-24 bg-secondary/10 relative overflow-hidden">
      <div className="section-container space-y-16">
        {/* Full Width Banner Section */}
        <MotionDiv>
          {bannerUrl ? (
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden group shadow-2xl bg-black">
              {/* Banner Image - Fade to black on hover for text visibility */}
              <img
                src={bannerUrl}
                alt={company?.name || "Company Banner"}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-70 group-hover:opacity-40 group-hover:scale-105"
              />

              {/* Overlay - Additional gradient for depth, but opacity relies mainly on image fading against black bg */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-all duration-700" />

              {/* Content Container - Centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 sm:p-12 text-white max-w-4xl mx-auto z-10">
                {/* Title - Always visible, scales slightly */}
                <h2 className="text-4xl sm:text-6xl font-display font-bold mb-6 transform transition-transform duration-500 group-hover:scale-105 drop-shadow-lg">
                  {title}
                </h2>

                {/* Description - Slides up and fades in */}
                <div className="overflow-hidden">
                  <div className="opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-100">
                    <p className="text-xl sm:text-2xl leading-relaxed text-gray-100 font-medium drop-shadow-md">
                      {content.description || content.content || content.subtitle || content.text || "About our company..."}
                    </p>
                  </div>
                </div>

                {/* Hint Arrow (Optional) - Fades out on hover */}
                <div className="absolute bottom-8 opacity-50 group-hover:opacity-0 transition-opacity duration-300 animate-bounce">
                  <span className="text-sm uppercase tracking-widest">Discover More</span>
                </div>
              </div>
            </div>
          ) : (
            // Fallback for no banner - Centered text
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6 text-card-foreground">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content.description || content.content || content.subtitle || content.text || "About our company..."}
              </p>
            </div>
          )}
        </MotionDiv>

        {/* Stats Section - Moved below banner */}
        {stats.length > 0 && (
          <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat: { label: string; value: string }, index: number) => (
              <StaggerItem key={index}>
                <div className="p-6 rounded-2xl bg-card border border-primary/10 shadow-lg shadow-primary/5 card-hover group transition-all duration-300 hover:border-primary/30 text-center">
                  <div className="text-4xl sm:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium group-hover:text-primary transition-colors">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        )}
      </div>
    </section >
  );
};
