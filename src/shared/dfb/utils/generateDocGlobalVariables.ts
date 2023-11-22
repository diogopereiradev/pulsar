// @ts-ignore
import hexToRgb from 'hex-to-rgb';
import { IDocumentationColorPalette } from "~/@types/declarations/Documentation";

export function generateDocGlobalVariables(colors: IDocumentationColorPalette, rgb = true): string {
  const colorNames = Object.keys(colors);
  const colorValues = Object.values(colors);

  return colorNames.reduce((acc, colorName, i) => {
    return `${acc} --${colorName}: ${rgb? hexToRgb(colorValues[i]) : colorValues[i]};`;
  }, '');
}