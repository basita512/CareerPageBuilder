import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Eye, Palette, Layout, Video, Share2, Briefcase, BarChart3, Settings2, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { JobPostingSection } from "@/components/recruiter/JobPostingSection";
import { AnalyticsDashboard } from "@/components/recruiter/AnalyticsDashboard";
import { SectionManagementSection } from "@/components/recruiter/SectionManagementSection";

const EditPage = () => {
  const [brandSettings, setBrandSettings] = useState({
    name: "Acme Corp",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    bannerUrl: "",
    logoUrl: "",
    videoUrl: "",
    aboutText: "We are building the future of technology.",
    metaTitle: "Join Our Team - Acme Corp Careers",
    metaDescription: "Explore exciting career opportunities at Acme Corp",
    faviconUrl: "",
  });

  const handleSave = () => {
    localStorage.setItem("brandSettings", JSON.stringify(brandSettings));
    toast.success("Settings saved successfully!");
  };

  const handlePublish = async () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Publishing career page...',
        success: 'Career page published successfully!',
        error: 'Failed to publish page',
      }
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Career Page</h1>
          <p className="text-muted-foreground">Customize your company's brand, content, and settings.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/company/preview">
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Link>
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </Button>
          <Button onClick={handlePublish}>
            Publish Page
          </Button>
        </div>
      </div>

      <Tabs defaultValue="brand" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 max-w-3xl">
          <TabsTrigger value="brand">
            <Palette className="mr-2 h-4 w-4" /> Brand
          </TabsTrigger>
          <TabsTrigger value="sections">
            <Layers className="mr-2 h-4 w-4" /> Sections
          </TabsTrigger>
          <TabsTrigger value="jobs">
            <Briefcase className="mr-2 h-4 w-4" /> Jobs
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Settings2 className="mr-2 h-4 w-4" /> SEO
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="mr-2 h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="share">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </TabsTrigger>
        </TabsList>

        <TabsContent value="brand">
          <Card>
            <CardHeader>
              <CardTitle>Branding & Theme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={brandSettings.name}
                    onChange={(e) => setBrandSettings({ ...brandSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2 flex flex-col gap-2">
                  <Label>Brand Colors</Label>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground uppercase">Primary</span>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          className="w-10 p-1 h-9"
                          value={brandSettings.primaryColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                        />
                        <Input
                          className="h-9 w-24 text-xs"
                          value={brandSettings.primaryColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground uppercase">Secondary</span>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          className="w-10 p-1 h-9"
                          value={brandSettings.secondaryColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, secondaryColor: e.target.value })}
                        />
                        <Input
                          className="h-9 w-24 text-xs"
                          value={brandSettings.secondaryColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, secondaryColor: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    placeholder="https://example.com/logo.png"
                    value={brandSettings.logoUrl}
                    onChange={(e) => setBrandSettings({ ...brandSettings, logoUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bannerUrl">Banner Image URL</Label>
                  <Input
                    id="bannerUrl"
                    placeholder="https://example.com/banner.jpg"
                    value={brandSettings.bannerUrl}
                    onChange={(e) => setBrandSettings({ ...brandSettings, bannerUrl: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections">
          <SectionManagementSection />
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Search Engine Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={brandSettings.metaTitle}
                  onChange={(e) => setBrandSettings({ ...brandSettings, metaTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  rows={3}
                  value={brandSettings.metaDescription}
                  onChange={(e) => setBrandSettings({ ...brandSettings, metaDescription: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input
                  id="favicon"
                  placeholder="https://example.com/favicon.ico"
                  value={brandSettings.faviconUrl}
                  onChange={(e) => setBrandSettings({ ...brandSettings, faviconUrl: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <JobPostingSection />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="share">
          <Card>
            <CardHeader>
              <CardTitle>Public Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Public Careers Link</Label>
                <div className="flex gap-2">
                  <Input readOnly value={`${window.location.origin}/company/careers`} />
                  <Button onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/company/careers`);
                    toast.success("Link copied to clipboard!");
                  }}>
                    Copy Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditPage;
