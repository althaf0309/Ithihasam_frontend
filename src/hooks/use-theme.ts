import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

// Module-level state rather than per-hook useState: every caller of useTheme()
// previously kept its own copy, so a second consumer would render the wrong
// icon and label after the first one toggled.
let currentTheme: Theme = readInitialTheme();

function readInitialTheme(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }

  // public/theme-init.js has already applied the stored preference to <html>
  // before paint, so the DOM is the source of truth by the time React mounts.
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function applyTheme(theme: Theme) {
  currentTheme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Private mode or blocked storage: the class still applies for this session. */
  }

  emit();
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => currentTheme,
    () => "dark" as Theme,
  );

  const setTheme = useCallback((next: Theme) => applyTheme(next), []);
  const toggleTheme = useCallback(() => applyTheme(currentTheme === "dark" ? "light" : "dark"), []);

  return { theme, setTheme, toggleTheme };
}
