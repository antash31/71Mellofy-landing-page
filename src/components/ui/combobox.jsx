"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Combobox = React.forwardRef(({
  options = [],
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  className,
  disabled = false,
  loading = false,
  onSearch,
  multiple = false,
  renderOption,
  renderValue,
  ...props
}, ref) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Handle single vs multiple selection
  const selectedValues = React.useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return value ? [value] : [];
  }, [value, multiple]);

  const handleSelect = React.useCallback((selectedValue) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(selectedValue)
        ? currentValues.filter((v) => v !== selectedValue)
        : [...currentValues, selectedValue];
      onValueChange?.(newValues);
    } else {
      onValueChange?.(selectedValue === value ? "" : selectedValue);
      setOpen(false);
    }
  }, [multiple, value, onValueChange]);

  const handleRemove = React.useCallback((valueToRemove, e) => {
    e?.stopPropagation();
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.filter((v) => v !== valueToRemove);
      onValueChange?.(newValues);
    } else {
      onValueChange?.("");
    }
  }, [multiple, value, onValueChange]);

  const handleSearch = React.useCallback((search) => {
    setSearchQuery(search);
    onSearch?.(search);
  }, [onSearch]);

  // Get display text for selected values
  const getDisplayText = React.useCallback(() => {
    if (selectedValues.length === 0) return placeholder;
    
    if (renderValue) {
      return renderValue(selectedValues, options);
    }
    
    if (multiple) {
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0]);
        return option?.label || selectedValues[0];
      }
      return `${selectedValues.length} selected`;
    }
    
    const option = options.find(opt => opt.value === selectedValues[0]);
    return option?.label || selectedValues[0];
  }, [selectedValues, options, placeholder, multiple, renderValue]);

  // Render selected values as chips for multiple selection
  const renderSelectedChips = React.useCallback(() => {
    if (!multiple || selectedValues.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {selectedValues.map((val) => {
          const option = options.find(opt => opt.value === val);
          const label = option?.label || val;
          
          return (
            <div
              key={val}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-md"
            >
              <span>{label}</span>
              <button
                type="button"
                onClick={(e) => handleRemove(val, e)}
                className="hover:bg-primary/20 rounded-sm p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    );
  }, [multiple, selectedValues, options, handleRemove]);

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between text-left font-normal",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}
            {...props}
          >
            <span className="truncate">{getDisplayText()}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-w-[var(--radix-popover-content-available-width)] p-0" align="start" sideOffset={4}>
          <Command shouldFilter={!onSearch}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={searchQuery}
              onValueChange={handleSearch}
            />
            <CommandEmpty>
              {loading ? "Loading..." : emptyText}
            </CommandEmpty>
            <CommandList className="max-h-[400px]">
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {renderOption ? renderOption(option) : (
                        <span>{option.label}</span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      {renderSelectedChips()}
    </div>
  );
});

Combobox.displayName = "Combobox";

export { Combobox };
