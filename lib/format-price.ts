export const formatPricetoLKR = (price: number) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "LKR",
  }).format(price);
};
