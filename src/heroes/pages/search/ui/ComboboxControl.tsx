import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import React from "react";
import { useSearchPageQueryParams } from "@/heroes/hooks/useSearchPageQueryParams";
import type { SearchOptions } from "@/heroes/interfaces/searchOptions.interface";

interface Props<K extends keyof SearchOptions> {
  items: Item[];
  filterField: K;
  value: string;
  label: string;
}

interface Item {
  value: string;
  label: string;
}

export const ComboboxControl = React.memo(
  <K extends keyof SearchOptions>({
    items,
    value,
    label,
    filterField,
  }: Props<K>) => {
    const [open, setOpen] = React.useState(false);

    const { handleFilterChange } = useSearchPageQueryParams();

    return (
      <>
        <label className="text-sm font-medium block">{label}</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={
                "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm justify-between"
              }
            >
              {value
                ? items.find((item) => item.value === value)?.label
                : `Todos l${label === "Categoria" ? "a" : "o"}s ${label.toLowerCase()}s...`}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        handleFilterChange(filterField, currentValue);
                        setOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === item.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </>
    );
  },
);
