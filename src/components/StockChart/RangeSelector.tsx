import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RangeSelectorProps {
  onRangeSelect: (range: string) => void;
  disabled?: boolean;
}

const ranges = [
  { 
    label: '1m', 
    value: '1m', 
    description: 'View 1 month' 
  },
  { 
    label: '3m', 
    value: '3m', 
    description: 'View 3 months' 
  },
  { 
    label: '6m', 
    value: '6m', 
    description: 'View 6 months' 
  },
  { 
    label: 'YTD', 
    value: 'ytd', 
    description: 'View year to date' 
  },
  { 
    label: '1y', 
    value: '1y', 
    description: 'View 1 year' 
  },
  { 
    label: 'All', 
    value: 'all', 
    description: 'View all' 
  },
];

export default function RangeSelector({ onRangeSelect, disabled }: RangeSelectorProps) {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {ranges.map(({ label, value, description }) => (
          <Tooltip key={value}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => onRangeSelect(value)}
                disabled={disabled}
                className="hover:bg-primary/10 transition-colors"
              >
                {label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}