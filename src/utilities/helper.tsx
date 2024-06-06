import dayjs from "dayjs";
import moment from "moment";
export const today = dayjs(moment().format("YYYY/MM/DD"));

export function formatter(value: number | string) {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function timeConverter(time: string) {
  return moment(time).subtract(6, "hours").format("DD MMM YYYY");
}

export function timeConverterWithTime(time: string) {
  return moment(time).subtract(6, "hours").format("DD MMM YYYY, hh:mm A");
}

export function generateRandomNumber(name: string) {
  const randomNumber =
    Math.floor(Math.random() * (99999999 - 9999999 + 1)) + 9999999;
  const paddedNumber = randomNumber.toString().padStart(12, "0");
  const code = `${name.toUpperCase()}${paddedNumber}`;
  return code;
}

export function tokenNoGenerate() {
  const code = Math.floor(Math.random() * (99999 - 9999 + 1)) + 9999;
  return code;
}

export function numberOfDaysInAMonth() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  return new Date(year, month, 0).getDate();
}
