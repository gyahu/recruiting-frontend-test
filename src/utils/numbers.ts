
const hardcodedConversion = {
  USD: {
    USD: 1,
    CLP: 800,
  },
  CLP: {
    USD: 1 / 800,
    CLP: 1,
  },
};

const convertTo = (from: string, to: string) => (value: number) => value * hardcodedConversion[from][to];

const toCurrency = (currency: string) => (value: number) => value.toLocaleString('en-US', { style: 'currency', currency });

export {
  convertTo,
  toCurrency,
};
