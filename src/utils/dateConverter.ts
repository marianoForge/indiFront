export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const month = date.getMonth() + 1; // Months are zero-based in JavaScript/TypeScript
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

  return `${month}/${day}/${year}`;
}
