export const formatNumber = (
  _payload: string | number,
  addDecimal: boolean = false
) => {
  if (!_payload) return _payload;
  // Convert payload to a number and fix it to two decimal places
  let payload = parseFloat(_payload.toString()).toFixed(2);

  // Handle the negative sign
  let sign = "";
  if (parseFloat(payload) < 0) {
    sign = "-";
    payload = payload.slice(1); // Remove the negative sign for formatting
  }

  // Split the integer and decimal parts
  const [integerPart, decimalPart] = payload.split(".");

  // Format the integer part with commas
  let result = "";
  let count = 0;

  for (let i = integerPart.length - 1; i >= 0; i--) {
    result = integerPart[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) {
      result = "," + result;
    }
  }

  // Combine the formatted integer part with the decimal part
  result = sign + result + (addDecimal ? "." + decimalPart : "");

  return result;
};

export const formatNumberToKMB = (
  number: number | string,
  decimalPlaces: number = 0
): string => {
  // Convert input to number
  const num = typeof number === "string" ? parseFloat(number) : number;

  if (isNaN(num)) return "0";

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (absNum >= 1000000000) {
    // Billions
    return sign + (absNum / 1000000000).toFixed(decimalPlaces) + "B";
  } else if (absNum >= 1000000) {
    // Millions
    return sign + (absNum / 1000000).toFixed(decimalPlaces) + "M";
  } else if (absNum >= 10000) {
    // Thousands
    return sign + (absNum / 1000).toFixed(decimalPlaces) + "K";
  } else if (absNum >= 1000) {
    // Thousands
    return sign + formatNumber(absNum, true);
  } else {
    // Less than 1000
    return sign + absNum.toFixed(decimalPlaces);
  }
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return "";
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{4})/, "+($1) $2 $3 $4");
};
