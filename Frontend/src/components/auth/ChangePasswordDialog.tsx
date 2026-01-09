import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import authService from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, KeyRound, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

interface ChangePasswordDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export function ChangePasswordDialog({ isOpen, onOpenChange }: ChangePasswordDialogProps) {
    const { logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    // Visibility states
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            // Check if we need to logout (if success was shown)
            if (isSuccess) {
                logout();
            }

            // Reset state when closing
            form.reset();
            setError(null);
            setIsSuccess(false);
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
        onOpenChange(open);
    };

    const handleLoginRedirect = () => {
        onOpenChange(false);
        logout();
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setError(null);
        try {
            setIsLoading(true);
            await authService.changePassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            });
            setIsSuccess(true);
        } catch (error: any) {
            console.error("Change password error:", error);
            const message = error.response?.data?.message || "Failed to change password";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold font-display">Password Changed!</h3>
                            <p className="text-muted-foreground text-sm max-w-[280px] mx-auto">
                                Your password has been successfully updated. Please login again with your new credentials.
                            </p>
                        </div>
                        <Button onClick={handleLoginRedirect} className="w-full max-w-[200px] mt-4">
                            Login Now
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <KeyRound className="h-5 w-5" /> Change Password
                            </DialogTitle>
                            <DialogDescription>
                                Enter your current password and a new secure password.
                                You will be logged out after changing it.
                            </DialogDescription>
                        </DialogHeader>

                        {error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showCurrentPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        {...field}
                                                        className="pr-10"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    >
                                                        {showCurrentPassword ?
                                                            <EyeOff className="h-4 w-4 text-muted-foreground" /> :
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        }
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showNewPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        {...field}
                                                        className="pr-10"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                    >
                                                        {showNewPassword ?
                                                            <EyeOff className="h-4 w-4 text-muted-foreground" /> :
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        }
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        {...field}
                                                        className="pr-10"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        {showConfirmPassword ?
                                                            <EyeOff className="h-4 w-4 text-muted-foreground" /> :
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        }
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter className="pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => onOpenChange(false)}
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Change Password
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
