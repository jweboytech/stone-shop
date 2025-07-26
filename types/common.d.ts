interface PageList<T> {
  items: T[];
}

type Country = {
  countryName: string;
  currencyCode: string;
  currencySymbol: string;
  flagUrl: string;
};
