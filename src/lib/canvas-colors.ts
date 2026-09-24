const HSL_CSS_VARIABLE = /^hsl\(\s*var\(\s*(--[a-zA-Z0-9_-]+)\s*\)\s*\)$/;

export type ReadCssVariable = (name: string) => string;

export function resolveCanvasColor(
  color: string,
  readCssVariable: ReadCssVariable,
  fallback = "transparent"
): string {
  const match = HSL_CSS_VARIABLE.exec(color);
  if (!match) return color;

  const channels = readCssVariable(match[1]).trim();
  return channels ? `hsl(${channels})` : fallback;
}

export function resolveCanvasColors<T extends Record<string, string>>(
  colors: T,
  readCssVariable: ReadCssVariable
): { [Key in keyof T]: string } {
  return Object.fromEntries(
    Object.entries(colors).map(([key, color]) => [
      key,
      resolveCanvasColor(color, readCssVariable),
    ])
  ) as { [Key in keyof T]: string };
}

export function getCanvasVariableReader(element: Element): ReadCssVariable {
  const styles = getComputedStyle(element);
  return (name) => styles.getPropertyValue(name);
}
