export const isStrictNumber = (message: string)=> ({
  options: (value: any) => typeof value === "number",
  errorMessage: message,
});
