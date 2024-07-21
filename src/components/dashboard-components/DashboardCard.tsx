import { cn } from "@/lib/utils";

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardCard({
  children,
  className,
  ...props
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "px-4 py-3 border-[#EFEEEB] border-2 rounded-xl ]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
