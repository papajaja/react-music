export function formatNums(num) {
  const number = num.toString();
  const units = number.slice(number.length - 3, number.length);
  let thousands = number.slice(number.length - 6, number.length - 3);
  let millions = number.slice(number.length - 9, number.length - 6);
  if (!millions && thousands) thousands = parseInt(thousands);
  return `${millions} ${thousands} ${units}`;
}
