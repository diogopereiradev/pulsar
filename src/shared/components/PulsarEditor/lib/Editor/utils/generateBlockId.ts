export function generateBlockId() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const result: string[] = [];

  for(let i = 0; i < 13; i++) {
    const char = chars[Math.floor(Math.random() * ((chars.length - 1) - 0) + 0)];
    result.push(char);
  }
  return result.join('');
}