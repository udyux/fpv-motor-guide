export const roundTo = (value: number, toMultiple: number) => {
  const absMultiple = Math.abs(toMultiple);
  const absValue = Math.abs(value);
  const carry = absValue % absMultiple;
  const rounded = carry < absMultiple * 0.5 ? absValue - carry : absValue - (carry - absMultiple);
  const [_x, decimals = ''] = String(absMultiple).split('.');
  const decimalShift = 10 ** decimals.length || 1;
  const result = Math.round(rounded * decimalShift) / decimalShift;
  return result * Math.sign(value);
};
