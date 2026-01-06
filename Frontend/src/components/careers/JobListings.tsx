import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, Building2, X, ChevronRight } from 'lucide-react';
import { Job, FilterState } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getUniqueLocations, getUniqueDepartments, getUniqueJobTypes } from '@/data/sampleData';

interface JobListingsProps {
  jobs: Job[];
  onJobClick?: (job: Job) => void;
}

const jobTypeLabels: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'contract': 'Contract',
  'internship': 'Internship',
};

export const JobListings = ({ jobs, onJobClick }: JobListingsProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    locations: [],
    jobTypes: [],
    departments: [],
  });

  const locations = getUniqueLocations(jobs);
  const departments = getUniqueDepartments(jobs);
  const jobTypes = getUniqueJobTypes(jobs);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (!job.isActive) return false;
      
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!job.title.toLowerCase().includes(searchLower) &&
            !job.department.toLowerCase().includes(searchLower) &&
            !job.location.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      // Location filter
      if (filters.locations.length > 0 && !filters.locations.includes(job.location)) {
        return false;
      }
      
      // Job type filter
      if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.jobType)) {
        return false;
      }
      
      // Department filter
      if (filters.departments.length > 0 && !filters.departments.includes(job.department)) {
        return false;
      }
      
      return true;
    });
  }, [jobs, filters]);

  const toggleFilter = (type: keyof Omit<FilterState, 'search'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({ search: '', locations: [], jobTypes: [], departments: [] });
  };

  const hasActiveFilters = filters.search || filters.locations.length > 0 || 
    filters.jobTypes.length > 0 || filters.departments.length > 0;

  return (
    <section id="jobs" className="py-24 dark-section">
      <div className="section-container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Open Positions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find your next opportunity and join our growing team
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 opacity-60" />
            <Input
              type="text"
              placeholder="Search by title, department, or location..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="pl-12 py-6 text-lg rounded-full border-[hsl(220_15%_25%)] bg-[hsl(220_20%_10%)] focus:border-primary text-[hsl(40_20%_95%)] placeholder:text-[hsl(40_10%_50%)]"
            />
          </div>

          {/* Filter Chips */}
          <div className="space-y-4">
            {/* Locations */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium opacity-70 flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Location:
              </span>
              {locations.map(location => (
                <button
                  key={location}
                  onClick={() => toggleFilter('locations', location)}
                  className={`filter-chip ${filters.locations.includes(location) ? 'active' : ''}`}
                >
                  {location}
                </button>
              ))}
            </div>

            {/* Departments */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium opacity-70 flex items-center gap-1">
                <Building2 className="h-4 w-4" /> Department:
              </span>
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => toggleFilter('departments', dept)}
                  className={`filter-chip ${filters.departments.includes(dept) ? 'active' : ''}`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Job Types */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium opacity-70 flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> Type:
              </span>
              {jobTypes.map(type => (
                <button
                  key={type}
                  onClick={() => toggleFilter('jobTypes', type)}
                  className={`filter-chip ${filters.jobTypes.includes(type) ? 'active' : ''}`}
                >
                  {jobTypeLabels[type] || type}
                </button>
              ))}
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="opacity-70">
            Showing <span className="font-bold opacity-100">{filteredJobs.length}</span> 
            {filteredJobs.length === 1 ? ' position' : ' positions'}
          </p>
        </motion.div>

        {/* Job Cards */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <JobCard job={job} onClick={() => onJobClick?.(job)} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredJobs.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-display font-bold mb-2">No positions found</h3>
              <p className="opacity-70 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

interface JobCardProps {
  job: Job;
  onClick?: () => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  return (
    <motion.article
      className="p-6 rounded-xl border border-[hsl(220_15%_20%)] bg-[hsl(220_20%_10%)] cursor-pointer group transition-all duration-300 hover:border-primary/50"
      onClick={onClick}
      whileHover={{ x: 8, boxShadow: '-8px 0 0 hsl(160 70% 45%)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge className="text-xs bg-[hsl(220_15%_18%)] text-[hsl(40_20%_90%)] border-[hsl(220_15%_25%)]">
              {job.department}
            </Badge>
            <Badge variant="outline" className="text-xs border-[hsl(220_15%_25%)] text-[hsl(40_20%_90%)]">
              {jobTypeLabels[job.jobType]}
            </Badge>
          </div>
          
          <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors mb-2 text-[hsl(40_20%_95%)]">
            {job.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-[hsl(40_10%_70%)]">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>
            {job.salaryRange && (
              <span className="font-medium text-primary">
                ${(job.salaryRange.min / 1000).toFixed(0)}k - ${(job.salaryRange.max / 1000).toFixed(0)}k
              </span>
            )}
          </div>
        </div>
        
        <ChevronRight className="h-6 w-6 text-[hsl(40_10%_50%)] group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
    </motion.article>
  );
};
