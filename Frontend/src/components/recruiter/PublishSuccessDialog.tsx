import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PublishSuccessDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    slug: string;
}

export const PublishSuccessDialog = ({
    isOpen,
    onOpenChange,
    slug,
}: PublishSuccessDialogProps) => {
    const [copied, setCopied] = useState(false);

    // Construct the public URL
    // Assuming the route is /demo/:slug/careers as established
    const publicUrl = `${window.location.origin}/demo/${slug}/careers`;

    const handleCopy = () => {
        navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleVisit = () => {
        window.open(publicUrl, "_blank");
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="text-center font-display text-xl">Published Successfully!</DialogTitle>
                    <DialogDescription className="text-center">
                        Your career page is now live and ready to accept applications.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center space-x-2 py-4">
                    <div className="grid flex-1 gap-2">
                        <Input
                            readOnly
                            value={publicUrl}
                            className="bg-muted text-muted-foreground font-mono text-sm h-9"
                        />
                    </div>
                    <Button type="button" size="icon" variant="outline" onClick={handleCopy} className="h-9 w-9">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>

                <DialogFooter className="flex-col sm:justify-center sm:flex-col gap-2">
                    <Button type="button" onClick={handleVisit} className="w-full gap-2">
                        Visit Live Page <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="w-full">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
