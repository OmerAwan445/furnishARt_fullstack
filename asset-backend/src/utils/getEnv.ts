export function getEnv(key: string): string {
  const value = process.env[key]!;
  return value;
}