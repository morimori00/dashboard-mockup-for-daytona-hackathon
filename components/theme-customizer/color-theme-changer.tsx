"use client";

import { PaletteIcon } from "lucide-react";

import { useThemeConfig } from "@/components/active-theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { THEMES } from "@/lib/themes";

export function ColorThemeChanger() {
  const { theme, setTheme } = useThemeConfig();
  const activeTheme = THEMES.find((preset) => preset.value === theme.preset) ?? THEMES[0];

  const handleThemeChange = (preset: string) => {
    setTheme({ ...theme, preset: preset as any });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="relative"
          aria-label={`Change dashboard color theme. Current theme: ${activeTheme.name}`}
        >
          <PaletteIcon />
          <span
            className="border-background ring-border absolute right-1 bottom-1 size-2.5 rounded-full border-2 ring-1"
            style={{ backgroundColor: activeTheme.colors[0] }}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel className="space-y-1 px-2 py-1.5">
          <span className="block">Color theme</span>
          <span className="text-muted-foreground block text-xs font-normal">
            Choose a palette for your dashboard.
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme.preset} onValueChange={handleThemeChange}>
          {THEMES.map((preset) => (
            <DropdownMenuRadioItem key={preset.value} value={preset.value} className="h-11 gap-3">
              <span
                className="flex size-7 shrink-0 overflow-hidden rounded-full border"
                aria-hidden="true"
              >
                {preset.colors.map((color) => (
                  <span
                    key={color}
                    className="h-full min-w-0 flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </span>
              <span className="min-w-0 flex-1 truncate">{preset.name}</span>
              {preset.value === theme.preset ? (
                <span className="text-muted-foreground text-xs">Current</span>
              ) : null}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <p className="text-muted-foreground px-2 py-1 text-xs">Changes are saved automatically.</p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
