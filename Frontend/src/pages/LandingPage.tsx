import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, Palette, BarChart3, Zap,
  Eye, Users, Globe, Check, ChevronRight, Building2, Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import { FeatureFrame } from '@/components/ui/FeatureFrame';

const LandingPage = () => {
  const features = [
    {
      icon: Palette,
      title: 'Brand Customization',
      description: 'Match your career page to your brand with custom colors, logos, and banners.',
      image: '/features/customization.png'
    },
    {
      icon: Zap,
      title: 'Section Builder',
      description: 'Drag-and-drop sections like About, Values, Benefits, and Testimonials.',
      image: '/features/section.png'
    },
    {
      icon: Eye,
      title: 'Live Preview',
      description: 'See changes in real-time before publishing to the world.',
      image: '/features/preview.png'
    },
    {
      icon: BarChart3,
      title: 'Built-in Analytics',
      description: 'Track page views, job views, and application clicks.',
      image: '/features/analytics.png'
    },
    {
      icon: Users,
      title: 'Candidate Experience',
      description: 'Mobile-friendly, accessible, and SEO-optimized for maximum reach.',
      image: '/features/candidateExp.png'
    },
    {
      icon: Globe,
      title: 'One-Click Publishing',
      description: 'Instantly publish your career page to a custom domain or subdomain. No coding required.',
      image: '/features/publish.png'
    },
  ];

  const showcaseCompanies = [
    { name: 'TechCorp', slug: 'techcorp', jobs: 3 },
    { name: 'Green Energy', slug: 'greenenergy', jobs: 2 }
  ];

  // Helper to get the base URL for public pages
  const getPublicUrl = (path: string) => {
    return `${window.location.origin}${path}`;
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="section-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">CareerBuilder</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
                Demo
              </a>
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Button asChild variant="outline">
                <Link to="/register">Sign Up</Link>
              </Button>
              <Button asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <Button asChild size="sm" variant="outline">
                <Link to="/register">Sign Up</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-12 md:pb-20">
        {/* Background effects */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-glow-gradient opacity-40 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-glow-gradient opacity-30 blur-3xl" />

        <div className="section-container relative z-10 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6 md:mb-8">
                <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                For ATS & Recruitment Platforms
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-6xl text-white lg:text-7xl font-display font-bold leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Build Beautiful{' '}
              <span className="text-gradient">Career Pages</span>{' '}
              in Minutes
            </motion.h1>

            <motion.p
              className="text-base sm:text-xl opacity-80 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed text-gray-400"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Help your clients create branded, mobile-friendly career pages that
              attract top talent. No coding required.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button size="lg" className="text-base md:text-lg px-8 py-6 glow w-full sm:w-auto" asChild>
                <a href={getPublicUrl('/demo/techcorp/careers')} target="_blank" rel="noopener noreferrer">
                  View Live Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-base md:text-lg px-8 py-6 w-full sm:w-auto" asChild>
                <Link to="/login">
                  Recruiter Login
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Floating UI elements - Hidden on mobile, visible on lg */}
        <motion.div
          className="absolute bottom-20 left-10 hidden lg:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="p-4 rounded-xl bg-background/90 backdrop-blur-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">SEO Ready</div>
                <div className="text-xs text-muted-foreground">Auto meta tags</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-40 right-10 hidden lg:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className="p-4 rounded-xl bg-background/90 backdrop-blur-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Mobile First</div>
                <div className="text-xs text-muted-foreground">Responsive design</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="pt-12 md:pt-24 bg-card relative">
        <div className="section-container">
          <SectionHeading
            title="Everything You Need"
            description="Powerful tools for recruiters, delightful experience for candidates."
            className=""
          />

          <StickyScroll
            content={features.map(f => ({
              title: f.title,
              description: f.description,
              content: (
                <FeatureFrame className="w-full">
                  <div className="w-full bg-muted/10 relative">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="w-full h-auto rounded-lg rounded-t-none block"
                    />
                  </div>
                </FeatureFrame>
              )
            }))}
            contentClassName="bg-transparent shadow-none"
          />
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-12 md:py-24 bg-background">
        <div className="section-container">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title="See It In Action"
              description="Explore sample career pages built with our platform."
            />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {showcaseCompanies.map((company, index) => (
              <motion.div
                key={company.slug}
                className="w-full md:w-[350px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a
                  href={getPublicUrl(`/demo/${company.slug}/careers`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold">
                      {company.name.charAt(0)}
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">{company.jobs} open positions</p>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-gradient opacity-20" />

        <div className="section-container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-lg md:text-xl opacity-70 mb-8 md:mb-10">
              Start building beautiful career pages for your clients today.
            </p>
            <Button size="lg" className="text-base md:text-lg px-10 py-6 glow w-full sm:w-auto" asChild>
              <Link to="/login">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-accent/5 border-t border-border dark:bg-card/30 dark:backdrop-blur-md">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">CareerBuilder</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Career Page Builder. Built for recruiters.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
