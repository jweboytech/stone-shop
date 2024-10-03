import QueryString from 'qs';

export function toUpperCase(str: string) {
  return str.toUpperCase();
}

export function serializateQuery(
  data: Record<string, any>,
  addQueryPrefix: boolean = true,
) {
  return QueryString.stringify(data, { addQueryPrefix });
}

export function serializateUrl<T extends object>(url: string, param: T) {
  const query = serializateQuery(param);

  return url + query;
}

export function formatPrice(amount: any) {
  const value = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return value;
}
