import { LucideIcon } from "lucide-react";
import React from "react";

const EmptyState = ({
  message,
  icon: Icon,
}: {
  message: string;
  icon: LucideIcon;
}) => {
  return (
    <div className="border border-solid flex flex-col justify-center items-center py-12">
      {Icon && (
        <Icon className="size-12 text-muted-foreground/50 mx-auto mb-4" />
      )}
      <p className="text-lg text-muted-foreground">{message}</p>
    </div>
  );
};

export default EmptyState;
