import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Briefcase, Calendar, CheckCircle2, Building2 } from 'lucide-react';
import { Job, Company } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { ApplyModal } from './ApplyModal';

interface JobDetailProps {
  job: Job;
  company: Company;
  onBack: () => void;
}

const jobTypeLabels: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'contract': 'Contract',
  'internship': 'Internship',
};

export const JobDetail = ({ job, company, onBack }: JobDetailProps) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      <ApplyModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
        jobTitle={job.title}
      />
      {/* Header */}
      <div className="hero-gradient py-16">
        <div className="section-container">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-muted-foreground hover:text-foreground"
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

            {job.benefits && job.benefits.length > 0 && (
              <section>
                <h2 className="text-2xl font-display font-bold mb-4">Benefits</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-primary">✓</span>
                      <span className="text-muted-foreground">{benefit}</span>
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
                onClick={() => setIsApplyModalOpen(true)}
              >
                Apply Now
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-medium mb-3">Share this job</h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
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

