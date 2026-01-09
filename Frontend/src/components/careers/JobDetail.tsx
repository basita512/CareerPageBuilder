import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Briefcase, Calendar, CheckCircle2, Building2, Linkedin } from 'lucide-react';
import { Job, Company } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useRef, useEffect } from 'react';
import { ApplyModal } from './ApplyModal';
import { analyticsService } from '@/services/analyticsService';

interface JobDetailProps {
  job: Job;
  company: Company;
  onBack: () => void;
  previewContainer?: HTMLDivElement | null;
  themeStyles?: React.CSSProperties;
}

const jobTypeLabels: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'contract': 'Contract',
  'internship': 'Internship',
};

export const JobDetail = ({ job, company, onBack, previewContainer, themeStyles }: JobDetailProps) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll window to top (for public page)
    window.scrollTo(0, 0);
    // Scroll element into view (for preview container)
    topRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });

    // Track Job View
    if (!previewContainer) { // Assuming previewContainer presence implies preview mode, or pass isPreview prop
      analyticsService.track({
        companySlug: company.slug,
        jobId: job.id,
        eventType: 'job_view',
      });
    }
  }, [job.id, company.slug, previewContainer]);

  const handleApplyClick = () => {
    setIsApplyModalOpen(true);
    if (!previewContainer) {
      analyticsService.track({
        companySlug: company.slug,
        jobId: job.id,
        eventType: 'apply_click',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
      ref={topRef}
    >
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobTitle={job.title}
        container={previewContainer}
        themeStyles={themeStyles}
      />
      {/* Header */}
      <div className="hero-gradient py-16">
        <div className="section-container">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-6 bg-background/50 hover:bg-background text-foreground hover:text-primary border-border/50 transition-all shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all positions
          </Button>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary">{job.department}</Badge>
            <Badge variant="outline">{jobTypeLabels[job.jobType]}</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {company.name}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {job.location}
            </span>
            <span className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              {jobTypeLabels[job.jobType]}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Posted {formatDate(job.createdAt)}
            </span>
          </div>

          {job.salaryRange && (
            <div className="mt-4">
              <span className="text-2xl font-display font-bold text-primary">
                ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}
              </span>
              <span className="text-muted-foreground ml-2">{job.salaryRange.currency}/year</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="section-container py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-display font-bold mb-4">About this role</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </section>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <section>
                <h2 className="text-2xl font-display font-bold mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{resp}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <section>
                <h2 className="text-2xl font-display font-bold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}

            {job.niceToHave && job.niceToHave.length > 0 && (
              <section>
                <h2 className="text-2xl font-display font-bold mb-4">Nice to Have</h2>
                <ul className="space-y-3">
                  {job.niceToHave.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-primary">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}


          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-display font-bold mb-4">Interested?</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Apply now and join our team at {company.name}!
              </p>

              <Button
                size="lg"
                className="w-full glow"
                onClick={handleApplyClick}
              >
                Apply Now
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-medium mb-3">Share this job</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
                    }}
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const text = encodeURIComponent(`Check out this ${job.title} role at ${company.name}!`);
                      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
                    }}
                  >
                    <svg className="h-3.5 w-3.5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

