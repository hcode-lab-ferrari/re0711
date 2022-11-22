export function getOnlyNumbers(value: string): string {
  return String(value.match(/\d/g)?.join(""));
}
