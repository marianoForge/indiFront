export function millisecondsToTime(ms: number): string {
  // Convert milliseconds to total seconds
  const totalSeconds = Math.floor(ms / 1000);

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format the output as "MM:SS"
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}
