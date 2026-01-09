import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CareerPage } from '@/components/careers/CareerPage';
import { companyService, CompanyDetails } from "@/services/companyService";
import { Loader2 } from "lucide-react";

interface CompanyData extends CompanyDetails {
  jobs: any[];
}

const DemoCareerPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const response = await companyService.getPublicCompany(slug);
        if (response.success && response.data) {
          setData(response.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch career page:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex bg-zinc-950 h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex bg-zinc-950 h-screen items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground">The career page you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return <CareerPage company={data} sections={data.sections} jobs={data.jobs} />;
};

export default DemoCareerPage;
