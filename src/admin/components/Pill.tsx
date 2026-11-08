import { cn } from "@/lib/utils";

const tones = {
  green: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  blue: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  amber: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  red: "bg-red-500/10 text-red-700 dark:text-red-400",
  gray: "bg-muted text-muted-foreground",
};

export function Pill({
  tone = "gray",
  children,
  className,
}: {
  tone?: keyof typeof tones;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
