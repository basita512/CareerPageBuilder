import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Company, Section, Job } from '@/types';
import { sampleCompany, sampleJobs, sampleSections } from '@/data/sampleData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/careers/HeroSection';
import { AboutSection } from '@/components/careers/AboutSection';
import { ValuesSection } from '@/components/careers/ValuesSection';
import { BenefitsSection } from '@/components/careers/BenefitsSection';
import { TestimonialsSection } from '@/components/careers/TestimonialsSection';
import { CTASection } from '@/components/careers/CTASection';
import { JobListings } from '@/components/careers/JobListings';
import { JobDetail } from '@/components/careers/JobDetail';

interface CareerPageProps {
  company?: Company;
  sections?: Section[];
  jobs?: Job[];
}

export const CareerPage = ({
  company = sampleCompany,
  sections = sampleSections,
  jobs = sampleJobs,
}: CareerPageProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Sort sections by orderIndex and filter visible
  const visibleSections = sections
    .filter(s => s.isVisible)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'hero':
        return <HeroSection key={section.id} section={section} company={company} />;
      case 'about':
        return <AboutSection key={section.id} section={section} />;
      case 'values':
        return <ValuesSection key={section.id} section={section} />;
      case 'benefits':
        return <BenefitsSection key={section.id} section={section} />;
      case 'testimonials':
        return <TestimonialsSection key={section.id} section={section} />;
      case 'cta':
        return <CTASection key={section.id} section={section} />;
      default:
        return null;
    }
  };

  return (
    <div className="dark min-h-screen">
      <Navbar company={company} />
      
      <AnimatePresence mode="wait">
        {selectedJob ? (
          <JobDetail
            key="job-detail"
            job={selectedJob}
            company={company}
            onBack={() => setSelectedJob(null)}
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
