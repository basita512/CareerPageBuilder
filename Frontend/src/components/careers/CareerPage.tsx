import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Company, Section, Job } from '@/types';

import { SEOHead } from '@/components/SEOHead';
import { generateThemeProperties, cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/careers/HeroSection';
import { AboutSection } from '@/components/careers/AboutSection';
import { ValuesSection } from '@/components/careers/ValuesSection';
import { BenefitsSection } from '@/components/careers/BenefitsSection';
import { TestimonialsSection } from '@/components/careers/TestimonialsSection';
import { JobListings } from '@/components/careers/JobListings';
import { JobDetail } from '@/components/careers/JobDetail';
import { analyticsService } from '@/services/analyticsService';

interface CareerPageProps {
  company?: Company;
  sections?: Section[];
  jobs?: Job[];
  isPreview?: boolean;
  previewContainer?: HTMLDivElement | null;
}

export const CareerPage = ({
  company,
  sections = [],
  jobs = [],
  isPreview = false,
  previewContainer,
}: CareerPageProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    if (company && !isPreview && !selectedJob) {
      analyticsService.track({
        companySlug: company.slug,
        eventType: 'page_view',
      });
    }
  }, [company?.slug, isPreview, selectedJob]);

  if (!company) {
    return null;
  }

  // Sort sections by orderIndex and filter visible
  const visibleSections = sections
    .filter(s => s.isVisible)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'hero':
        return <HeroSection key={section.id} section={section} company={company} />;
      case 'about':
        return <AboutSection key={section.id} section={section} company={company} />;
      case 'values':
        return <ValuesSection key={section.id} section={section} />;
      case 'benefits':
        return <BenefitsSection key={section.id} section={section} />;
      case 'testimonials':
        return <TestimonialsSection key={section.id} section={section} />;
      default:
        return null;
    }
  };

  // Determine effective colors
  const themeStyles = generateThemeProperties(
    company.colors || {},
    company.themeMode || 'light'
  );

  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground font-sans transition-colors duration-300 career-page-wrapper",
        company.themeMode === 'dark' ? 'dark' : ''
      )}
      style={{
        ...themeStyles,
        '--font-sans': `"${company.fontFamily || 'Inter'}", sans-serif`,
        '--font-display': `"${company.fontFamily || 'Inter'}", sans-serif`,
      } as React.CSSProperties}
    >
      <SEOHead
        title={selectedJob ? `${selectedJob.title} - ${company.name}` : (company.metaTitle ? `${company.name} - ${company.metaTitle}` : company.name)}
        description={selectedJob ? selectedJob.description : company.metaDescription}
        companyName={company.name}
        image={company.bannerUrl || company.logoUrl}
        favicon={company.faviconUrl}
        jobs={jobs}
      />
      {!selectedJob && (
        <Navbar
          company={company}
          isPreview={isPreview}
          previewContainer={previewContainer}
        />
      )}

      <AnimatePresence mode="wait">
        {selectedJob ? (
          <JobDetail
            key="job-detail"
            job={selectedJob}
            company={company}
            onBack={() => setSelectedJob(null)}
            previewContainer={previewContainer}
            themeStyles={themeStyles}
          />
        ) : (
          <main key="career-page">
            {visibleSections.map(renderSection)}
            <JobListings jobs={jobs} onJobClick={(job) => setSelectedJob(job)} />
          </main>
        )}
      </AnimatePresence>

      {!selectedJob && <Footer company={company} />}
    </div>
  );
};
