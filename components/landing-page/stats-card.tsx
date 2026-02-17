import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  hasBorder?: boolean;
}

const StatsCard = ({ icon: Icon, value, label, hasBorder }: StatsCardProps) => {
  return (
    <div
      className={cn(
        "space-y-2",
        hasBorder && "border-x border-2 border-gray-300/50 border-y-0 ",
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <Icon className="size-5 text-primary/70" />
        <p className="text-3xl sm:text-4xl font-bold">{value}</p>
      </div>
      <p>{label}</p>
    </div>
  );
};

export default StatsCard;
