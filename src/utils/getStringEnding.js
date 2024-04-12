export const getStringEnding = (number) => {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;
  if (lastTwoDigits.toString().length === 2) {
    if (lastTwoDigits >= 11 && lastTwoDigits <= 20) {
      return "ов";
    }
  }
  if (lastDigit === 1) return "";
  if (lastDigit >= 2 && lastDigit <= 4) return "а";
  if ((lastDigit >= 5 && lastDigit <= 9) || lastDigit === 0) return "ов";
  return "none";
};
