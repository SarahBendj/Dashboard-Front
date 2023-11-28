import { ToolTipITC } from "@/TYPES.ts/creationData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export function TooltipDemo({legend , children}:  ToolTipITC) {
  return (
    <TooltipProvider>
      <Tooltip>
      <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>

        <TooltipContent>
          <p className="bg-white text-blue-500 text-2xl">{legend}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
