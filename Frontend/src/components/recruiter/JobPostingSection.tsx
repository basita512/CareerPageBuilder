import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { PlusCircle, Trash2, X, Pencil, Ban } from "lucide-react";
import { jobService, Job, CreateJobData } from "@/services/jobService";

const jobSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  department: z.string().min(2, "Department is required"),
  location: z.string().min(2, "Location is required"),
  locationType: z.enum(["remote", "onsite", "hybrid"]),
  jobType: z.enum(["full-time", "part-time", "contract"]),
  contractType: z.enum(["temporary", "permanent", "internship"]),
  seniority: z.enum(["entry", "mid", "senior", "lead", "executive", "architect"]),
  salaryMin: z.coerce.number().optional(),
  salaryMax: z.coerce.number().optional(),
  salaryCurrency: z.string().default("USD"),
  requirements: z.array(z.object({ value: z.string() })).optional(),
  responsibilities: z.array(z.object({ value: z.string() })).optional(),
  niceToHave: z.array(z.object({ value: z.string() })).optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

const defaultValues: JobFormValues = {
  title: "",
  description: "",
  department: "",
  location: "",
  locationType: "onsite",
  jobType: "full-time",
  contractType: "permanent",
  seniority: "mid",
  salaryCurrency: "USD",
  requirements: [{ value: "" }],
  responsibilities: [{ value: "" }],
  niceToHave: [{ value: "" }],
};

export function JobPostingSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues,
  });

  const { fields: reqFields, append: appendReq, remove: removeReq } = useFieldArray({
    control: form.control,
    name: "requirements",
  });

  const { fields: respFields, append: appendResp, remove: removeResp } = useFieldArray({
    control: form.control,
    name: "responsibilities",
  });

  const { fields: niceFields, append: appendNice, remove: removeNice } = useFieldArray({
    control: form.control,
    name: "niceToHave",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobService.getMyJobs();
      if (response.success) {
        setJobs(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      toast.error("Failed to load jobs");
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJobId(job.id);
    form.reset({
      title: job.title,
      description: job.description,
      department: job.department,
      location: job.location,
      locationType: job.locationType as any,
      jobType: job.jobType as any,
      contractType: job.contractType as any,
      seniority: job.seniority as any,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      salaryCurrency: job.salaryCurrency || "USD",
      requirements: job.requirements?.length ? job.requirements.map(r => ({ value: r })) : [{ value: "" }],
      responsibilities: job.responsibilities?.length ? job.responsibilities.map(r => ({ value: r })) : [{ value: "" }],
      niceToHave: job.niceToHave?.length ? job.niceToHave.map(n => ({ value: n })) : [{ value: "" }],
    });

    // Scroll to form top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingJobId(null);
    form.reset(defaultValues);
  };

  async function onSubmit(values: JobFormValues) {
    try {
      setIsLoading(true);
      // Transform array lists of objects back to string arrays for API
      // Filter out empty strings
      const requirements = values.requirements?.map(i => i.value).filter(v => v.trim() !== "") || [];
      const responsibilities = values.responsibilities?.map(i => i.value).filter(v => v.trim() !== "") || [];
      const niceToHave = values.niceToHave?.map(i => i.value).filter(v => v.trim() !== "") || [];

      const apiData: CreateJobData = {
        title: values.title,
        description: values.description,
        department: values.department,
        location: values.location,
        locationType: values.locationType,
        jobType: values.jobType,
        contractType: values.contractType,
        seniority: values.seniority,
        salaryMin: values.salaryMin,
        salaryMax: values.salaryMax,
        salaryCurrency: values.salaryCurrency,
        requirements,
        responsibilities,
        niceToHave,
      };

      if (editingJobId) {
        const response = await jobService.updateJob(editingJobId, apiData);
        if (response.success) {
          toast.success("Job updated successfully!");
          setEditingJobId(null);
          form.reset(defaultValues);
          fetchJobs();
        }
      } else {
        const response = await jobService.createJob(apiData);
        if (response.success) {
          toast.success("Job posting created successfully!");
          form.reset(defaultValues);
          fetchJobs();
        }
      }
    } catch (error) {
      console.error("Failed to save job:", error);
      toast.error(editingJobId ? "Failed to update job" : "Failed to create job posting");
    } finally {
      setIsLoading(false);
    }
  }

  const confirmDelete = async () => {
    if (!jobToDelete) return;

    try {
      await jobService.deleteJob(jobToDelete);
      toast.success("Job deleted successfully");
      setJobs(jobs.filter(j => j.id !== jobToDelete));
      if (editingJobId === jobToDelete) {
        cancelEdit();
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
      toast.error("Failed to delete job");
    } finally {
      setJobToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{editingJobId ? "Edit Job Posting" : "Create New Job Posting"}</CardTitle>
          {editingJobId && (
            <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-muted-foreground w-auto">
              <Ban className="mr-2 h-4 w-4" /> Cancel Edit
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Senior Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Engineering" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the role..." className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="locationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="onsite">On-site</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contractType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="permanent">Permanent</SelectItem>
                          <SelectItem value="temporary">Temporary</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seniority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seniority *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="lead">Lead</SelectItem>
                          <SelectItem value="architect">Architect</SelectItem>
                          <SelectItem value="executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="salaryMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Min</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Max</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Requirements Section */}
              <div className="space-y-3 pt-2 bg-muted/30 p-4 rounded-lg border border-border/40">
                <FormLabel className="text-base font-semibold">Requirements</FormLabel>
                {reqFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`requirements.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="Add a requirement" className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeReq(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendReq({ value: "" })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Requirement
                  </Button>
                </div>
              </div>

              {/* Responsibilities Section */}
              <div className="space-y-3 pt-2 bg-muted/30 p-4 rounded-lg border border-border/40">
                <FormLabel className="text-base font-semibold">Responsibilities</FormLabel>
                {respFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`responsibilities.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="Add a responsibility" className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeResp(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendResp({ value: "" })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Responsibility
                  </Button>
                </div>
              </div>

              {/* Nice to Have Section */}
              <div className="space-y-3 pt-2 bg-muted/30 p-4 rounded-lg border border-border/40">
                <FormLabel className="text-base font-semibold">Nice to Have</FormLabel>
                {niceFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`niceToHave.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="Add a nice-to-have skill" className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeNice(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendNice({ value: "" })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t flex justify-end gap-4">
                {editingJobId && (
                  <Button type="button" variant="outline" className="w-auto" onClick={cancelEdit}>
                    Cancel Edit
                  </Button>
                )}
                <Button type="submit" className="w-auto min-w-[150px]" disabled={isLoading}>
                  {isLoading ? (editingJobId ? "Updating..." : "Creating...") : (
                    <>
                      {editingJobId ? (
                        <>
                          <Pencil className="mr-2 h-4 w-4" /> Update Job
                        </>
                      ) : (
                        <>
                          <PlusCircle className="mr-2 h-4 w-4" /> Post Job
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Job Postings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No active job postings.
              </div>
            )}
            {jobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="min-w-0 flex-1 mr-2">
                  <h3 className="font-bold truncate">{job.title}</h3>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted-foreground">
                    <span className="truncate max-w-[120px]">{job.department}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="truncate max-w-[150px]">{job.location} ({job.locationType})</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="capitalize">{job.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditJob(job)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setJobToDelete(job.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!jobToDelete} onOpenChange={(open) => !open && setJobToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job posting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
