export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "BDT",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
 
export const number = new Intl.NumberFormat("en-US");
