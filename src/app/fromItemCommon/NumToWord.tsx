// import { ToWords } from "to-words";

// type Props = {
//   number: number;
// };

// const NumToWord = ({ number }: Props) => {
//   const toWords = new ToWords({
//     localeCode: "en-IN",
//     converterOptions: {
//       currency: true,
//       ignoreDecimal: false,
//       ignoreZeroCurrency: false,
//       doNotAddOnly: false,
//       currencyOptions: {
//         // can be used to override defaults for the selected locale
//         name: "Taka",
//         plural: "Taka",
//         symbol: "৳",
//         fractionalUnit: {
//           name: "Paisa",
//           plural: "Paise",
//           symbol: "",
//         },
//       },
//     },
//   });

//   return <div>{`${toWords.convert(number || 0)}`}</div>;
// };

// export default NumToWord;
