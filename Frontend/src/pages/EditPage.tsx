import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Eye, Palette, Share2, Briefcase, BarChart3, Settings2, Layers, LogOut, Upload, Loader2, ExternalLink, Copy } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { JobPostingSection } from "@/components/recruiter/JobPostingSection";
import { AnalyticsDashboard } from "@/components/recruiter/AnalyticsDashboard";
import { SectionManagementSection } from "@/components/recruiter/SectionManagementSection";
import { PublishSuccessDialog } from "@/components/recruiter/PublishSuccessDialog";
import { ChangePasswordDialog } from "@/components/auth/ChangePasswordDialog";
import { useAuth } from "@/contexts/AuthContext";
import { companyService, CompanyDetails } from "@/services/companyService";
import { uploadService } from "@/services/uploadService";
import { PRESET_PALETTES } from "@/lib/utils";

const EditPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab Persistence
  const activeTab = searchParams.get("tab") || "brand";
  const setActiveTab = (tab: string) => {
    setSearchParams(prev => {
      prev.set("tab", tab);
      return prev;
    }, { replace: true });
  };

  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState<string>("");
  const [companySlug, setCompanySlug] = useState<string>("");
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const [brandSettings, setBrandSettings] = useState({
    name: "",
    website: "",
    colors: {} as Record<string, string>,
    fontFamily: "Inter",
    bannerUrl: "",
    logoUrl: "",
    aboutText: "",
    metaTitle: "",
    metaDescription: "",
    faviconUrl: "",
    themeMode: "light" as "light" | "dark",
  });

  const [sections, setSections] = useState<any[]>([]);

  const [pendingUploads, setPendingUploads] = useState<{
    logo?: File;
    banner?: File;
    favicon?: File;
  }>({});

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      const output = await companyService.getMyCompany();
      if (output.success && output.data) {
        const data = output.data;
        setCompanyId(data.id);
        setCompanySlug(data.slug);
        setSections(data.sections || []);
        setBrandSettings({
          name: data.name,
          website: data.website || "",
          colors: data.colors || {},
          fontFamily: data.fontFamily || "Inter",
          bannerUrl: data.bannerUrl || "",
          logoUrl: data.logoUrl || "",
          aboutText: "",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          faviconUrl: data.faviconUrl || "",
          themeMode: data.themeMode || "light",
        });
      }
    } catch (error) {
      console.error("Failed to fetch company details:", error);
      toast.error("Failed to load company details");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

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

  // Auto-save logic
  const handleBrandingChange = async (updates: Partial<typeof brandSettings>) => {
    setBrandSettings(prev => ({ ...prev, ...updates }));
  };

  const saveBranding = async () => {
    try {
      let logoUrl = brandSettings.logoUrl;
      let bannerUrl = brandSettings.bannerUrl;

      // Upload pending images first
      if (pendingUploads.logo) {
        const res = await uploadService.uploadImage(pendingUploads.logo);
        if (res.success) logoUrl = res.data.url;
      }
      if (pendingUploads.banner) {
        const res = await uploadService.uploadImage(pendingUploads.banner);
        if (res.success) bannerUrl = res.data.url;
      }

      await companyService.updateBranding({
        companyName: brandSettings.name,
        website: brandSettings.website,
        colors: brandSettings.colors,
        fontFamily: brandSettings.fontFamily,
        logoUrl: logoUrl,
        bannerUrl: bannerUrl,
        themeMode: brandSettings.themeMode,
      });

      // Update state with final URLs and clear pending
      setBrandSettings(prev => ({ ...prev, logoUrl, bannerUrl }));
      setPendingUploads(prev => ({ ...prev, logo: undefined, banner: undefined }));

    } catch (error) {
      console.error("Failed to save branding:", error);
      throw error;
    }
  };

  const saveSEO = async () => {
    try {
      let faviconUrl = brandSettings.faviconUrl;

      if (pendingUploads.favicon) {
        const res = await uploadService.uploadImage(pendingUploads.favicon);
        if (res.success) faviconUrl = res.data.url;
      }

      await companyService.updateSEO({
        metaTitle: brandSettings.metaTitle,
        metaDescription: brandSettings.metaDescription,
        faviconUrl: faviconUrl,
      });

      setBrandSettings(prev => ({ ...prev, faviconUrl }));
      setPendingUploads(prev => ({ ...prev, favicon: undefined }));

    } catch (error) {
      console.error("Failed to save SEO:", error);
      throw error;
    }
  };

  const handleFileUpload = (file: File, type: 'logo' | 'banner' | 'favicon') => {
    // Create local preview
    const previewUrl = URL.createObjectURL(file);

    // Update pending uploads
    setPendingUploads(prev => ({ ...prev, [type]: file }));

    // Update UI immediately with preview
    if (type === 'logo') setBrandSettings(prev => ({ ...prev, logoUrl: previewUrl }));
    if (type === 'banner') setBrandSettings(prev => ({ ...prev, bannerUrl: previewUrl }));
    if (type === 'favicon') setBrandSettings(prev => ({ ...prev, faviconUrl: previewUrl }));

    toast.info("Image selected. Click 'Save Changes' to upload and apply.");
  };

  return (
    <div className="container mx-auto py-8 px-4 pb-48 max-w-6xl relative min-h-[100dvh]">
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-200">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Edit Career Page</h1>
          <p className="text-muted-foreground">Customize your company's brand, content, and settings.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Button variant="outline" onClick={handleSignOut} className="flex-1 md:flex-none">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
          <Button variant="outline" onClick={() => setIsChangePasswordOpen(true)} size="icon" title="Change Password">
            <Settings2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" asChild className="flex-1 md:flex-none">
            <Link to="/company/preview">
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Link>
          </Button>
          <Button onClick={handlePublish} className="w-full md:w-auto mt-2 md:mt-0">
            Publish Page
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex w-full justify-start overflow-x-auto h-auto p-1 bg-muted/50 rounded-lg no-scrollbar snap-x">
          <TabsTrigger value="brand" className="flex-shrink-0 min-w-fit px-4">
            <Palette className="mr-2 h-4 w-4" /> Brand
          </TabsTrigger>
          <TabsTrigger value="sections" className="flex-shrink-0 min-w-fit px-4">
            <Layers className="mr-2 h-4 w-4" /> Sections
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex-shrink-0 min-w-fit px-4">
            <Briefcase className="mr-2 h-4 w-4" /> Jobs
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex-shrink-0 min-w-fit px-4">
            <Settings2 className="mr-2 h-4 w-4" /> SEO
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex-shrink-0 min-w-fit px-4">
            <BarChart3 className="mr-2 h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="share" className="flex-shrink-0 min-w-fit px-4">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </TabsTrigger>
        </TabsList>

        <TabsContent value="brand">
          <Card>
            <CardHeader>
              <CardTitle>Branding & Theme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Row 1: Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={brandSettings.name}
                    onChange={(e) => handleBrandingChange({ name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://acme.com"
                    value={brandSettings.website}
                    onChange={(e) => handleBrandingChange({ website: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 2: Theme, Font & Palette */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left Column: Theme & Font */}
                <div className="space-y-6">
                  {/* Theme Mode */}
                  <div className="space-y-3">
                    <Label>Theme Mode</Label>
                    <RadioGroup
                      value={brandSettings.themeMode || 'light'}
                      onValueChange={(value) => handleBrandingChange({ themeMode: value as 'light' | 'dark' })}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="mode-light" />
                        <Label htmlFor="mode-light" className="font-normal cursor-pointer">Light Mode</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="mode-dark" />
                        <Label htmlFor="mode-dark" className="font-normal cursor-pointer">Dark Mode</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Font Family */}
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select
                      value={brandSettings.fontFamily}
                      onValueChange={(value) => handleBrandingChange({ fontFamily: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter" style={{ fontFamily: 'Inter' }}>Inter</SelectItem>
                        <SelectItem value="Roboto" style={{ fontFamily: 'Roboto' }}>Roboto</SelectItem>
                        <SelectItem value="Open Sans" style={{ fontFamily: 'Open Sans' }}>Open Sans</SelectItem>
                        <SelectItem value="Lato" style={{ fontFamily: 'Lato' }}>Lato</SelectItem>
                        <SelectItem value="Montserrat" style={{ fontFamily: 'Montserrat' }}>Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column: Palette Selection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Choose a Color Palette</Label>
                    <span className="text-xs text-muted-foreground">Select to apply</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {PRESET_PALETTES.map((palette) => {
                      // Helper to calculate relative luminance for sorting
                      const getLuminance = (hex: string) => {
                        const c = hex.replace('#', '');
                        const rgb = parseInt(c, 16);
                        const r = (rgb >> 16) & 0xff;
                        const g = (rgb >> 8) & 0xff;
                        const b = (rgb >> 0) & 0xff;
                        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
                      };

                      const sortedColors = palette.colors ? Object.values(palette.colors).sort((a, b) => getLuminance(a) - getLuminance(b)) : [];
                      const isSelected = brandSettings.colors?.primary === palette.colors.primary;

                      return (
                        <button
                          key={palette.name}
                          onClick={() => handleBrandingChange({
                            colors: palette.colors
                          })}
                          className={`group flex flex-col items-center gap-2 p-1 rounded-lg border transition-all relative ${isSelected
                            ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                            : "border-transparent hover:border-primary/50"
                            }`}
                          type="button"
                        >
                          <div className="relative flex w-full h-8 rounded-full overflow-hidden shadow-sm border ring-1 ring-border/50">
                            {sortedColors.map((color, idx) => (
                              <div
                                key={idx}
                                className="flex-1 h-full"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                            {isSelected && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <div className="bg-white rounded-full p-0.5 shadow-sm">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-3 h-3 text-primary"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                          <span className={`text-[10px] text-center font-medium transition-colors ${isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            }`}>
                            {palette.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Row 3: Assets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex gap-2">
                    <Input
                      value={brandSettings.logoUrl}
                      onChange={(e) => handleBrandingChange({ logoUrl: e.target.value })}
                      className="flex-1"
                      placeholder="https://..."
                    />
                    <div className="relative">
                      <Button type="button" variant="outline" size="icon" className="relative cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'logo');
                          }}
                          disabled={!!pendingUploads.logo}
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Banner Image</Label>
                  <div className="flex gap-2">
                    <Input
                      value={brandSettings.bannerUrl}
                      onChange={(e) => handleBrandingChange({ bannerUrl: e.target.value })}
                      className="flex-1"
                      placeholder="https://..."
                    />
                    <div className="relative">
                      <Button type="button" variant="outline" size="icon" className="relative cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'banner');
                          }}
                          disabled={!!pendingUploads.banner}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => {
                  toast.promise(saveBranding(), {
                    loading: 'Saving changes...',
                    success: 'Branding updated successfully',
                    error: 'Failed to save changes'
                  });
                }}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections">
          <SectionManagementSection sections={sections} onRefresh={fetchCompanyDetails} />
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
                  onChange={(e) => handleBrandingChange({ metaTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  rows={3}
                  value={brandSettings.metaDescription}
                  onChange={(e) => handleBrandingChange({ metaDescription: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="favicon"
                    placeholder="https://example.com/favicon.ico"
                    value={brandSettings.faviconUrl}
                    onChange={(e) => handleBrandingChange({ faviconUrl: e.target.value })}
                    className="flex-1"
                  />
                  <div className="relative">
                    <Button type="button" variant="outline" size="icon" className="relative cursor-pointer">
                      <Upload className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], 'favicon');
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button onClick={() => {
                  toast.promise(saveSEO(), {
                    loading: 'Saving SEO settings...',
                    success: 'SEO settings updated successfully',
                    error: 'Failed to save settings'
                  });
                }}>Save Changes</Button>
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
                  <div className="relative flex-1">
                    <Input
                      readOnly
                      value={`${window.location.origin}/demo/${companySlug}/careers`}
                      className="pr-12"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/demo/${companySlug}/careers`);
                        toast.success("Link copied to clipboard!");
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={() => window.open(`${window.location.origin}/demo/${companySlug}/careers`, '_blank')}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Site
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs >

      <PublishSuccessDialog
        isOpen={isPublishDialogOpen}
        onOpenChange={setIsPublishDialogOpen}
        slug={companySlug}
      />
      <ChangePasswordDialog
        isOpen={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />
    </div >
  );
};

export default EditPage;
