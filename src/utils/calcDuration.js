export function calcDuration(ms) {
  return (
    Math.floor(ms / 1000 / 60) +
    ":" +
    Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0")
  );
}
