export function arraySwap(arr: unknown[], from: number, to: number) {
  // Remove any reactivity from array
  const parsedArr = JSON.parse(JSON.stringify(arr));
  const tmpTo = parsedArr[to];
  const tmpFrom = parsedArr[from];

  parsedArr[from] = tmpTo;
  parsedArr[to] = tmpFrom;
  
  return parsedArr;
}