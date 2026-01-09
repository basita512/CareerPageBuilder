import { useEffect, useState } from "react";
import { CareerPage } from "@/components/careers/CareerPage";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { companyService, CompanyDetails } from "@/services/companyService";
import { PublishSuccessDialog } from "@/components/recruiter/PublishSuccessDialog";

interface CompanyData extends CompanyDetails {
  jobs: any[];
}

const PreviewPage = () => {
  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewContainer, setPreviewContainer] = useState<HTMLDivElement | null>(null);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        setLoading(true);
        const response = await companyService.getMyCompany();
        if (response.success && response.data) {
          setData(response.data as CompanyData);
        }
      } catch (error) {
        console.error("Failed to load preview data:", error);
        toast.error("Failed to load preview");
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, []);

  const handlePublish = async () => {
    try {
      const promise = companyService.publishPage();
      toast.promise(promise, {
        loading: 'Publishing career page...',
        success: 'Career page published successfully!',
        error: 'Failed to publish page',
      });
      await promise;
      setIsPublishDialogOpen(true);
    } catch (error) {
      console.error("Publish error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-background h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-background flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-[100] bg-background border-b px-3 py-3 shadow-md">
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" asChild className="hover:bg-muted hover:text-foreground px-2 sm:px-3">
              <Link to="/company/edit">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back to Editor</span>
                <span className="inline sm:hidden">Back</span>
              </Link>
            </Button>
            <div className="h-4 w-px bg-border hidden md:block" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider hidden md:block">Preview Mode</span>
          </div>
          <Button size="sm" onClick={handlePublish} className="bg-primary hover:bg-primary/90 shadow-sm px-3">
            <Send className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Publish Page</span>
            <span className="inline sm:hidden">Publish</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 pt-20 pb-5 px-4 max-w-[1400px] mx-auto w-full h-full flex flex-col overflow-hidden">
        <div
          className="flex-1 bg-background border rounded-xl shadow-2xl overflow-hidden relative flex flex-col"
          style={{ transform: 'translate3d(0,0,0)' }}
        >
          {/* Browser Bar Simulation */}
          <div className="h-10 bg-muted/50 border-b flex items-center px-4 gap-2 flex-shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
            </div>
            <div className="bg-background border rounded text-[10px] text-muted-foreground px-3 py-1 ml-4 w-64 text-center items-center flex justify-center truncate">
              Preview Mode: {data?.slug ? `demo/${data.slug}` : 'Generating...'}
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              {data?.jobs?.length || 0} active jobs
            </div>
          </div>

          {/* Preview Content */}
          <div
            ref={setPreviewContainer}
            className="flex-1 overflow-y-auto relative isolate custom-scrollbar"
          >
            <CareerPage
              company={data || undefined}
              sections={data?.sections}
              jobs={data?.jobs}
              isPreview={true}
              previewContainer={previewContainer}
            />
          </div>
        </div>
        <PublishSuccessDialog
          isOpen={isPublishDialogOpen}
          onOpenChange={setIsPublishDialogOpen}
          slug={data?.slug || ""}
        />
      </div>
    </div>
  );
};

export default PreviewPage;
