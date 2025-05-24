import { ChevronDown, ChevronUp, XCircle, Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@tanstack/react-table";
import { useTranslate } from "@/config/useTranslation";

interface DataTableColumnHeaderProps {
  column: Column<any, any>;
  title: string;
  className?: string;
}

export function DataTableColumnHeader({
  column,
  title,
  className,
}: DataTableColumnHeaderProps) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  const { t } = useTranslate();

  return (
    <div
      className={cn("flex items-center space-x-2 justify-center", className)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent "
          >
            <span>{t(title)}</span>
            {column.getIsSorted() === "desc" ? (
              <ChevronDown className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ChevronUp className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            ) : (
              <XCircle className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <Eye className="ltr:mr-2 rtl:ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {t("Hide")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
