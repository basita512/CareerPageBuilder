import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureFrameProps {
    children: ReactNode;
    className?: string;
    headerTitle?: string;
}

export const FeatureFrame = ({ children, className, headerTitle }: FeatureFrameProps) => {
    return (
        <div className={cn(
            "rounded-xl rounded-b-none overflow-hidden bg-muted/10 w-full h-full flex flex-col",
            className
        )}>
            {/* Window Header */}
            <div className="h-10 bg-muted/50 border-b border-border/40 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                {headerTitle && (
                    <div className="ml-4 text-xs font-medium text-muted-foreground opacity-70">
                        {headerTitle}
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden">
                {children}
            </div>
        </div>
    );
};
