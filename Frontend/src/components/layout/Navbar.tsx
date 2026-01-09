import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { Company } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface NavbarProps {
  company?: Company;
  isRecruiter?: boolean;
  isPreview?: boolean;
  previewContainer?: HTMLDivElement | null;
}

export const Navbar = ({ company, isRecruiter = false, isPreview = false, previewContainer }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = previewContainer ? previewContainer.scrollTop : window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    const target = previewContainer || window;
    target.addEventListener('scroll', handleScroll);
    return () => target.removeEventListener('scroll', handleScroll);
  }, [isPreview, previewContainer]);

  return (
    <motion.nav
      className={`${isPreview ? 'sticky top-0 -mb-16 sm:-mb-20' : 'fixed'} left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? 'glass shadow-sm border-b border-primary/10'
        : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {company?.logoUrl ? (
              <img src={company.logoUrl} alt={company.name} className="h-8 w-8 object-contain" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
                {company?.name?.charAt(0) || 'C'}
              </div>
            )}
            <span className="font-display font-bold text-xl hidden sm:block">
              {company?.name || 'Careers'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors link-underline">
              About
            </a>
            <a href="#jobs" className="text-muted-foreground hover:text-foreground transition-colors link-underline">
              Open Positions
            </a>
            {company?.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Website
              </a>
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isRecruiter ? (
              <Button variant="outline" asChild>
                <Link to="/company/edit">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </Link>
              </Button>
            ) : (
              <Button
                onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Jobs
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden glass border-t border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="section-container py-6 space-y-4">
            <a
              href="#about"
              className="block py-2 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#jobs"
              className="block py-2 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Open Positions
            </a>
            {company?.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-lg"
              >
                Website
              </a>
            )}
            <Button
              className="w-full mt-4"
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Jobs
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
