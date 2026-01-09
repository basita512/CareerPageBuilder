import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  GripVertical,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Layout,
  Info,
  CheckCircle,
  Heart,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Save,
  X,
  CreditCard,
  PlusCircle,
  Banknote,
  Stethoscope,
  Home,
  BookOpen,
  Plane,
  Baby,
  Flower2,
  Palmtree
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { sectionService } from "@/services/sectionService";

const SECTION_ICONS = {
  hero: Layout,
  about: Info,
  values: Heart,
  benefits: CheckCircle,
};

const BENEFIT_OPTIONS = [
  { value: 'money', label: 'Compensation', icon: Banknote },
  { value: 'health', label: 'Health', icon: Stethoscope },
  { value: 'remote', label: 'Remote', icon: Home },
  { value: 'learning', label: 'Learning', icon: BookOpen },
  { value: 'travel', label: 'Travel', icon: Plane },
  { value: 'family', label: 'Family', icon: Baby },
  { value: 'wellness', label: 'Wellness', icon: Flower2 },
  { value: 'pto', label: 'PTO', icon: Palmtree },
];

type Section = {
  id: string;
  type: keyof typeof SECTION_ICONS;
  title: string;
  subtitle?: string; // Mapped from content.subtitle
  content?: string;  // Mapped from content.text
  values?: any[];    // Mapped from content.values
  benefits?: any[];  // Mapped from content.benefits
  isVisible: boolean;
  orderIndex: number;
};

interface SectionManagementProps {
  sections: any[];
  onRefresh: () => void;
}

export function SectionManagementSection({ sections: rawSections, onRefresh }: SectionManagementProps) {
  // Map backend sections to frontend structure
  const sections: Section[] = rawSections.map(s => ({
    id: s.id,
    type: s.type as keyof typeof SECTION_ICONS,
    title: s.title,
    subtitle: s.content?.subtitle || "",
    content: s.content?.text || "",
    values: s.content?.values || [],
    benefits: s.content?.benefits || [],
    isVisible: s.isVisible,
    orderIndex: s.orderIndex
  }));

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  // Local state for adding new benefit
  const [newBenefit, setNewBenefit] = useState({ title: "", description: "", icon: "money" });

  const handleToggleVisibility = async (section: Section) => {
    try {
      await sectionService.updateSection(section.id, { isVisible: !section.isVisible });
      toast.success("Section visibility updated");
      onRefresh();
    } catch (error) {
      toast.error("Failed to update visibility");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await sectionService.deleteSection(id);
      toast.success("Section removed");
      onRefresh();
    } catch (error) {
      toast.error("Failed to remove section");
    }
  };

  const handleStartEdit = (section: Section) => {
    setExpandedId(section.id);
    setEditingSection({ ...section });
    setNewBenefit({ title: "", description: "", icon: "money" });
    setNewValue({ title: "", description: "" });
  };

  const handleSaveEdit = async () => {
    if (editingSection) {
      try {
        await sectionService.updateSection(editingSection.id, {
          title: editingSection.title,
          content: {
            subtitle: editingSection.subtitle,
            text: editingSection.content,
            values: editingSection.values,
            benefits: editingSection.benefits
          }
        });
        setEditingSection(null);
        setExpandedId(null);
        toast.success("Section saved successfully");
        onRefresh();
      } catch (error) {
        toast.error("Failed to save section");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setExpandedId(null);
  };

  const handleAddSection = async (type: keyof typeof SECTION_ICONS) => {
    // Check if section type already exists (Single instance policy for ALL sections)
    if (sections.some(s => s.type === type)) {
      toast.error(`${type.charAt(0).toUpperCase() + type.slice(1)} section already added!`);
      return;
    }

    try {
      await sectionService.createSection({
        type,
        title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
        content: {}, // Default empty content
        orderIndex: sections.length, // Append to end
        isVisible: true,
      });
      toast.success(`${type} section added`);
      onRefresh();
    } catch (error) {
      toast.error("Failed to add section");
    }
  };

  const addBenefitItem = () => {
    if (!editingSection || !newBenefit.title || !newBenefit.description) {
      toast.error("Please fill in title and description");
      return;
    }

    setEditingSection({
      ...editingSection,
      benefits: [...(editingSection.benefits || []), { ...newBenefit }]
    });
    setNewBenefit({ title: "", description: "", icon: "money" });
  };

  const removeBenefitItem = (index: number) => {
    if (!editingSection) return;
    const newBenefits = [...(editingSection.benefits || [])];
    newBenefits.splice(index, 1);
    setEditingSection({ ...editingSection, benefits: newBenefits });
  };

  // Local state for adding new value
  const [newValue, setNewValue] = useState({ title: "", description: "" });

  const addValueItem = () => {
    if (!editingSection || !newValue.title || !newValue.description) {
      toast.error("Please fill in title and description");
      return;
    }
    setEditingSection({
      ...editingSection,
      values: [...(editingSection.values || []), { ...newValue }]
    });
    setNewValue({ title: "", description: "" });
  };

  const removeValueItem = (index: number) => {
    if (!editingSection) return;
    const newValues = [...(editingSection.values || [])];
    newValues.splice(index, 1);
    setEditingSection({ ...editingSection, values: newValues });
  };

  // Helper to get icon component
  const getBenefitIcon = (value: string) => {
    const option = BENEFIT_OPTIONS.find(o => o.value === value);
    return option ? option.icon : CheckCircle;
  };

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 px-4 py-3">
          <CardTitle className="text-lg font-display">Page Sections</CardTitle>
          <div className="flex gap-2">

          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {sections.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No sections yet. Add one to get started!
              </div>
            )}
            {sections.map((section) => {
              const Icon = SECTION_ICONS[section.type] || Info;
              const isExpanded = expandedId === section.id;
              const isEditing = editingSection?.id === section.id;
              const currentSection = isEditing ? editingSection : section;

              return (
                <div
                  key={section.id}
                  className={`transition-all ${!section.isVisible ? "opacity-60 grayscale-[0.5]" : ""
                    } ${isExpanded ? "bg-muted/20" : "hover:bg-muted/10"}`}
                >
                  <div
                    className="flex items-center justify-between p-3 sm:p-4 cursor-pointer"
                    onClick={() => isExpanded ? handleCancelEdit() : handleStartEdit(section)}
                  >
                    <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                      <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-move flex-shrink-0" />
                      <div className="p-1.5 sm:p-2.5 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0 mr-1">
                        <h3 className="text-sm sm:text-base font-semibold text-foreground truncate leading-tight">{section.title}</h3>
                        <Badge variant="secondary" className="mt-0.5 sm:mt-1 h-5 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground border-transparent w-fit">
                          {section.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-0 sm:gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleToggleVisibility(section)}
                      >
                        {section.isVisible ? (
                          <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(section.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8"
                        onClick={() => isExpanded ? handleCancelEdit() : handleStartEdit(section)}
                      >
                        {isExpanded ? <ChevronUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                      </Button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-2 pb-6 pt-2 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid gap-4 bg-muted/10 p-3 md:p-6 rounded-xl border border-border/50">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Section Title</label>
                          <Input
                            value={currentSection.title}
                            onChange={(e) => setEditingSection(prev => prev ? { ...prev, title: e.target.value } : null)}
                            placeholder="Main Heading"
                            className="bg-card border-border/50 focus:border-primary/50 text-sm"
                          />
                        </div>


                        {section.type.toLowerCase() === 'hero' && (
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subtitle</label>
                            <Input
                              value={currentSection.subtitle || ''}
                              onChange={(e) => setEditingSection(prev => prev ? { ...prev, subtitle: e.target.value } : null)}
                              placeholder="Enter a subtitle..."
                              className="bg-card border-border/50 focus:border-primary/50 text-sm"
                            />
                          </div>
                        )}


                        {section.type !== 'hero' && section.type !== 'benefits' && section.type !== 'values' && (
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Content / Description</label>
                            <Textarea
                              value={currentSection.content}
                              onChange={(e) => setEditingSection(prev => prev ? { ...prev, content: e.target.value } : null)}
                              placeholder="Section description text..."
                              className="bg-card border-border/50 focus:border-primary/50 min-h-[120px] resize-none text-sm"
                            />
                          </div>
                        )}

                        {/* Values Editor */}
                        {section.type === 'values' && (
                          <div className="space-y-4 pt-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Values Items</label>

                            {/* List Existing */}
                            <div className="space-y-2">
                              {currentSection.values?.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50 group">
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm truncate">{item.title}</div>
                                    <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                                  </div>
                                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeValueItem(idx)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>

                            {/* Add New */}
                            <div className="grid gap-3 p-4 bg-muted/20 rounded-lg border border-border/50">
                              <div className="font-semibold text-xs text-muted-foreground uppercase">Add New Value</div>
                              <Input
                                placeholder="Value Title (e.g. Integrity)"
                                value={newValue.title}
                                onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
                              />
                              <Textarea
                                placeholder="Description (e.g. We do the right thing...)"
                                className="h-20 resize-none"
                                value={newValue.description}
                                onChange={(e) => setNewValue({ ...newValue, description: e.target.value })}
                              />
                              <Button size="sm" variant="secondary" onClick={addValueItem} className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add This Value
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Benefits Editor */}
                        {section.type === 'benefits' && (
                          <div className="space-y-4 pt-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Benefits Items</label>

                            {/* List Existing */}
                            <div className="space-y-2">
                              {currentSection.benefits?.map((item: any, idx: number) => {
                                const ItemIcon = getBenefitIcon(item.icon);
                                return (
                                  <div key={idx} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50 group">
                                    <div className="text-xl flex-shrink-0 w-8 h-8 flex items-center justify-center bg-muted rounded">
                                      <ItemIcon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-semibold text-sm truncate">{item.title}</div>
                                      <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeBenefitItem(idx)}>
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Add New */}
                            <div className="grid gap-3 p-4 bg-muted/20 rounded-lg border border-border/50">
                              <div className="font-semibold text-xs text-muted-foreground uppercase">Add New Benefit</div>
                              <div className="grid grid-cols-[80px_1fr] gap-3">
                                <Select value={newBenefit.icon} onValueChange={(val) => setNewBenefit({ ...newBenefit, icon: val })}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Icon" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {BENEFIT_OPTIONS.map(opt => {
                                      const OptIcon = opt.icon;
                                      return (
                                        <SelectItem key={opt.value} value={opt.value}>
                                          <span className="flex items-center gap-2">
                                            <OptIcon className="h-4 w-4" />
                                            {/* <span className="text-xs">{opt.label}</span> */}
                                          </span>
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                                <Input
                                  placeholder="Benefit Title (e.g. Remote Work)"
                                  value={newBenefit.title}
                                  onChange={(e) => setNewBenefit({ ...newBenefit, title: e.target.value })}
                                />
                              </div>
                              <Textarea
                                placeholder="Description (e.g. Work from anywhere...)"
                                className="h-20 resize-none"
                                value={newBenefit.description}
                                onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                              />
                              <Button size="sm" variant="secondary" onClick={addBenefitItem} className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add This Benefit
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end gap-2 pt-2">
                          <Button variant="outline" size="sm" onClick={handleCancelEdit} className="h-9 px-4 no-default-hover-elevate">
                            <X className="mr-2 h-4 w-4" /> Cancel
                          </Button>
                          <Button size="sm" onClick={handleSaveEdit} className="h-9 px-4 bg-primary hover:bg-primary/90 no-default-hover-elevate">
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                          </Button>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted/20 p-6 rounded-2xl border border-dashed border-border">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 text-center">Add New Section</h3>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3">
          {(Object.keys(SECTION_ICONS) as Array<keyof typeof SECTION_ICONS>).map((type) => (
            <Button
              key={type}
              variant="outline"
              className="h-24 sm:h-24 sm:w-56 flex flex-col gap-2 hover-elevate bg-background border-border/50 hover:border-primary/30 group whitespace-normal"
              onClick={() => handleAddSection(type)}
            >
              <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-center">{type}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
