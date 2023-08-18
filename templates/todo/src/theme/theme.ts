export type Theme = "light" | "dark";

const themeStorageKey = "preferredTheme";

export async function getCurrentTheme() {
  const prom = new Promise<Theme>((res) => {
    const preferredTheme = globalThis.localStorage.getItem(
      themeStorageKey
    ) as Theme;
    if (preferredTheme) res(preferredTheme);

    const defaultTheme: Theme = globalThis.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";

    res(defaultTheme);
  });

  return prom;
}

export function savePreferredTheme(preferredTheme: Theme) {
  globalThis.localStorage.setItem(themeStorageKey, preferredTheme);
}
