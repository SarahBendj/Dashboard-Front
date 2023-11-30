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

        <TooltipContent className="p-0 m-4">
          <p className="p-4 font-bold  bg-gray-950 shadow-sm shadow-cyan-700 ">{legend}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
