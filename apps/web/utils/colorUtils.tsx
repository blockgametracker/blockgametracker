export const baseColors = [
  "#00e13f",
  "#835af3",
  "#ffc42f",
  "#ee3232",
  "#ee57de",
  "#55e8ee",
  "#1e4ad5",
  "#ff6918",
  "#bada55",
  "#ff00ff",
  "#ff1493",
  "#ffa500",
  "#800080",
  "#008000",
  "#000080",
];

export function getColor(index: number): string {
  const baseColor = baseColors[index % baseColors.length];
  const variationFactor = Math.floor(index / baseColors.length);
  return adjustColor(baseColor, variationFactor);
}

function adjustColor(color: string, factor: number): string {
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  r = Math.min(255, r + factor * 20);
  g = Math.min(255, g + factor * 20);
  b = Math.min(255, b + factor * 20);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// Function to convert hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

// Function to convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// Function to convert hex to HSL string
export function hexToHslString(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return `hsl(${h}, ${s}%, ${l}%)`;
}