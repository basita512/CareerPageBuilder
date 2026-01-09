import { Helmet } from 'react-helmet-async';
import { Job } from '@/types';

interface SEOHeadProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    companyName?: string;
    favicon?: string;
    jobs?: Job[];
}

export const SEOHead = ({
    title,
    description,
    image,
    url,
    companyName,
    favicon,
    jobs = []
}: SEOHeadProps) => {
    const siteTitle = title || companyName || 'Career Page';
    const metaDescription = description || (companyName ? `Check out career opportunities at ${companyName}` : 'Join our team!');

    // JSON-LD for Job Postings
    const jobSchema = jobs.map(job => ({
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description, // Ideally stripped of HTML, but Google can handle basic HTML
        "identifier": {
            "@type": "PropertyValue",
            "name": companyName,
            "value": job.id
        },
        "datePosted": job.createdAt,
        "hiringOrganization": {
            "@type": "Organization",
            "name": companyName,
            "logo": image || favicon
        },
        // Map internal types to Schema.org types
        "employmentType": mapJobType(job.jobType),
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": job.location || "Remote",
                "addressCountry": "US" // Defaulting to US if not parsed, or could omit
            }
        },
        ...(job.locationType === 'remote' ? { "applicantLocationRequirements": { "@type": "Country", "name": "Remote" }, "jobLocationType": "TELECOMMUTE" } : {}),
        ...(job.salaryRange ? {
            "baseSalary": {
                "@type": "MonetaryAmount",
                "currency": job.salaryRange.currency || "USD",
                "value": {
                    "@type": "QuantitativeValue",
                    "minValue": job.salaryRange.min,
                    "maxValue": job.salaryRange.max,
                    "unitText": "YEAR" // Assumption
                }
            }
        } : {})
    }));

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            {favicon && <link rel="icon" href={favicon} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metaDescription} />
            {image && <meta property="og:image" content={image} />}
            {url && <meta property="og:url" content={url} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={metaDescription} />
            {image && <meta name="twitter:image" content={image} />}

            {/* Structured Data (JSON-LD) for Jobs */}
            {jobs.length > 0 && (
                <script type="application/ld+json">
                    {JSON.stringify(jobSchema)}
                </script>
            )}
        </Helmet>
    );
};

// Helper to map internal job types to Schema.org employment types
function mapJobType(type: string): string {
    const map: Record<string, string> = {
        'full-time': 'FULL_TIME',
        'part-time': 'PART_TIME',
        'contract': 'CONTRACTOR',
        'internship': 'INTERN',
        'temporary': 'TEMPORARY'
    };
    return map[type.toLowerCase()] || 'FULL_TIME';
}
