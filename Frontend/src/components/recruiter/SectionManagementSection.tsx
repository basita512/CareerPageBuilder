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
} from "lucide-react";
import { toast } from "sonner";

const SECTION_ICONS = {
  hero: Layout,
  about: Info,
  values: Heart,
  benefits: CheckCircle,
  testimonials: MessageSquare,
  cta: ArrowRight,
};

type Section = {
  id: string;
  type: keyof typeof SECTION_ICONS;
  title: string;
  subtitle?: string;
  content?: string;
  isVisible: boolean;
};

export function SectionManagementSection() {
  const [sections, setSections] = useState<Section[]>([
    { id: "1", type: "hero", title: "Join Our Team", subtitle: "Build the future with us", isVisible: true },
    { id: "2", type: "about", title: "Who We Are", content: "We are a team of passionate creators...", isVisible: true },
    { id: "3", type: "values", title: "Our Culture", content: "Transparency, Innovation, Excellence", isVisible: true },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  const handleToggleVisibility = (id: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, isVisible: !s.isVisible } : s
    ));
    toast.success("Section visibility updated");
  };

  const handleDelete = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
    toast.success("Section removed");
  };

  const handleStartEdit = (section: Section) => {
    setExpandedId(section.id);
    setEditingSection({ ...section });
  };

  const handleSaveEdit = () => {
    if (editingSection) {
      setSections(sections.map(s => s.id === editingSection.id ? editingSection : s));
      setEditingSection(null);
      setExpandedId(null);
      toast.success("Section saved successfully");
    }
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setExpandedId(null);
  };

  const handleAddSection = (type: keyof typeof SECTION_ICONS) => {
    const newSection: Section = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      subtitle: "",
      content: "",
      isVisible: true,
    };
    setSections([...sections, newSection]);
    handleStartEdit(newSection);
    toast.success(`${type} section added`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 pb-4">
          <CardTitle className="text-xl font-display">Page Sections</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => handleAddSection("hero")} className="bg-primary/90 hover:bg-primary">
              <Plus className="mr-2 h-4 w-4" /> Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {sections.map((section) => {
              const Icon = SECTION_ICONS[section.type] || Info;
              const isExpanded = expandedId === section.id;
              const isEditing = editingSection?.id === section.id;
              const currentSection = isEditing ? editingSection : section;

              return (
                <div
                  key={section.id}
                  className={`transition-all ${
                    !section.isVisible ? "opacity-60 grayscale-[0.5]" : ""
                  } ${isExpanded ? "bg-muted/20" : "hover:bg-muted/10"}`}
                >
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer" 
                    onClick={() => isExpanded ? handleCancelEdit() : handleStartEdit(section)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <GripVertical className="h-5 w-5 text-muted-foreground/50 cursor-move" />
                      <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{section.title}</h3>
                        <Badge variant="secondary" className="mt-1 h-5 text-[10px] font-bold tracking-wider uppercase bg-muted text-muted-foreground border-transparent">
                          {section.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleToggleVisibility(section.id)}
                      >
                        {section.isVisible ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(section.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-12 pb-6 pt-2 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid gap-4 bg-muted/10 p-6 rounded-xl border border-border/50">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Section Title</label>
                          <Input
                            value={currentSection.title}
                            onChange={(e) => setEditingSection(prev => prev ? { ...prev, title: e.target.value } : null)}
                            placeholder="Main Heading"
                            className="bg-card border-border/50 focus:border-primary/50"
                          />
                        </div>
                        
                        {(section.type === 'hero' || section.type === 'cta') && (
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subtitle</label>
                            <Input
                              value={currentSection.subtitle}
                              onChange={(e) => setEditingSection(prev => prev ? { ...prev, subtitle: e.target.value } : null)}
                              placeholder="Secondary text"
                              className="bg-card border-border/50 focus:border-primary/50"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Content / Description</label>
                          <Textarea
                            value={currentSection.content}
                            onChange={(e) => setEditingSection(prev => prev ? { ...prev, content: e.target.value } : null)}
                            placeholder="Section description text..."
                            className="bg-card border-border/50 focus:border-primary/50 min-h-[120px] resize-none"
                          />
                        </div>

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {(Object.keys(SECTION_ICONS) as Array<keyof typeof SECTION_ICONS>).map((type) => (
            <Button
              key={type}
              variant="outline"
              className="h-20 flex flex-col gap-2 hover-elevate bg-background border-border/50 hover:border-primary/30 group"
              onClick={() => handleAddSection(type)}
            >
              <div className="p-1.5 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{type}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
