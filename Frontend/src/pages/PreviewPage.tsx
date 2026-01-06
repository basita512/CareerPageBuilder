import { useEffect, useState } from "react";
import { CareerPage } from "@/components/careers/CareerPage";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

const PreviewPage = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("brandSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handlePublish = () => {
    toast.success("Page published successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-[100] bg-background border-b px-4 py-3 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="hover:bg-muted">
              <Link to="/company/edit">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Editor
              </Link>
            </Button>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Preview Mode</span>
          </div>
          <Button size="sm" onClick={handlePublish} className="bg-primary hover:bg-primary/90 shadow-sm">
            <Send className="mr-2 h-4 w-4" /> Publish Page
          </Button>
        </div>
      </div>
      
      <div className="pt-16 border-x max-w-[1400px] mx-auto shadow-2xl relative z-0 min-h-[calc(100vh-64px)] bg-background">
        <CareerPage />
      </div>
    </div>
  );
};

export default PreviewPage;
