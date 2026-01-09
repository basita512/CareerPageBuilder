import { motion } from 'framer-motion';
import { Company } from '@/types';

interface FooterProps {
  company?: Company;
}

export const Footer = ({ company }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-card border-t border-border dark:bg-card/30 dark:backdrop-blur-md transition-colors duration-300">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Company */}
          <div className="flex items-center gap-3">
            {company?.logoUrl ? (
              <img src={company.logoUrl} alt={company.name} className="h-8 w-8 object-contain" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
                {company?.name?.charAt(0) || 'C'}
              </div>
            )}
            <span className="font-display font-bold text-lg">
              {company?.name || 'Careers'}
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a href="#jobs" className="hover:text-foreground transition-colors">
              Open Positions
            </a>
            {company?.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Company Website
              </a>
            )}
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} {company?.name || 'Company'}. All rights reserved.
          </div>
        </div>

        {/* Powered by */}
        <motion.div
          className="mt-8 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-muted-foreground">
            Powered by{' '}
            <a href="/" className="text-primary hover:underline font-medium">
              Career Page Builder
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
