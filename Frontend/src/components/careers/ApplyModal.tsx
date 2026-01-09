import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { uploadService } from '@/services/uploadService';

const applySchema = z.object({
    fullName: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number is required'),
    resumeUrl: z.string().min(1, 'Resume is required'),
    coverLetter: z.string().optional(),
    linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
});

type ApplyFormValues = z.infer<typeof applySchema>;

interface ApplyModalProps {
    jobTitle: string;
    isOpen: boolean;
    onClose: () => void;
    container?: HTMLElement | null;
    themeStyles?: React.CSSProperties;
}

export const ApplyModal = ({ jobTitle, isOpen, onClose, container, themeStyles }: ApplyModalProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isParsing, setIsParsing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ApplyFormValues>({
        resolver: zodResolver(applySchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            resumeUrl: '',
            coverLetter: '',
            linkedin: '',
        },
    });

    const handleFile = useCallback(async (selectedFile: File) => {
        if (!selectedFile.type.includes('pdf') && !selectedFile.type.includes('word') && !selectedFile.name.match(/\.(pdf|doc|docx)$/i)) {
            toast.error('Please upload a PDF or Word document');
            return;
        }

        setFile(selectedFile);
        setIsParsing(true);

        try {
            const response = await uploadService.uploadResume(selectedFile);
            if (response.success) {
                form.setValue('resumeUrl', response.data.url);
                toast.success('Resume uploaded successfully!');
            } else {
                toast.error('Failed to upload resume');
                setFile(null);
            }
        } catch (error) {
            console.error('Resume upload error:', error);
            toast.error('Failed to upload resume');
            setFile(null);
        } finally {
            setIsParsing(false);
        }
    }, [form, jobTitle]);

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const onSubmit = async (data: ApplyFormValues) => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success('Application submitted successfully!');
            onClose();
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogPortal container={container}>
                <DialogOverlay />
                <DialogPrimitive.Content
                    style={themeStyles}
                    className={cn(
                        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-0 border-2 border-primary/20 bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                        "sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col"
                    )}>
                    <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full opacity-70 ring-offset-background transition-all hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10 p-2 bg-background/80 text-foreground hover:bg-background shadow-sm border border-input">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>

                    <div className="bg-primary/10 p-6 border-b border-primary/20">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-display font-bold text-foreground">Apply for {jobTitle}</DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Submit your application and join our team.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-6 overflow-y-auto custom-scrollbar flex-1">

                        <div className="space-y-6 py-4">
                            {/* Resume Upload Area - Kept consistent */}
                            {!file ? (
                                <div
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${isDragging ? 'border-primary bg-primary/10' : 'border-primary/20 bg-secondary/5 hover:bg-secondary/10'
                                        }`}
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={onDrop}
                                    onClick={() => document.getElementById('resume-upload')?.click()}
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Upload className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">Drag and drop your resume here</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                PDF, DOC, DOCX up to 5MB
                                            </p>
                                        </div>
                                        <div className="cursor-pointer">
                                            <span className="text-primary hover:underline font-medium">Or browse files</span>
                                            <Input
                                                id="resume-upload"
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-4 rounded-xl border border-primary/20 bg-primary/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            {isParsing ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : <FileText className="h-5 w-5 text-primary" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm truncate max-w-[200px] text-foreground">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {isParsing ? 'Autofilling details...' : 'Resume uploaded'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); form.setValue('resumeUrl', ''); }}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-foreground">Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} className="bg-muted/30 focus:bg-background transition-colors border-input focus:border-primary text-foreground" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-foreground">Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john@example.com" type="email" {...field} className="bg-muted/30 focus:bg-background transition-colors border-input focus:border-primary text-foreground" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-foreground">Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+1 (555) 000-0000" {...field} className="bg-muted/30 focus:bg-background transition-colors border-input focus:border-primary text-foreground" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="linkedin"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-foreground">LinkedIn URL (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://linkedin.com/in/..." {...field} className="bg-muted/30 focus:bg-background transition-colors border-input focus:border-primary text-foreground" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="coverLetter"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-foreground">Cover Letter / Additional Information</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us why you're a great fit..."
                                                        className="min-h-[120px] resize-none bg-muted/30 focus:bg-background transition-colors border-input focus:border-primary text-foreground"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full text-primary-foreground shadow-lg card-hover" size="lg" disabled={isSubmitting || isParsing}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit Application
                                                <CheckCircle2 className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    );
};
