import dayjs from 'dayjs';
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

export function formatPrice(amount?: string | number) {
  if (amount != null) {
    const value = Number(amount);

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value / 100);
  }
}

export function formatTime(
  value?: string | number,
  format?: 'YYYY-MM-DD' | 'MMM D' | 'MMM D YYYY',
) {
  if (value != null) {
    return dayjs(value).format(format);
  }
}

export function getCardLast(cardNo?: string) {
  if (cardNo != null) {
    return `....${cardNo.slice(-1)}`;
  }
}
