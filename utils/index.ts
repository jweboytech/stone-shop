import dayjs from 'dayjs';
import QueryString from 'qs';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

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

export function formatPrice(
  amount: string | number,
  style?: 'currency' | 'decimal',
) {
  const value = Number(amount);

  return new Intl.NumberFormat('en-US', {
    style: style || 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value / 100);
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

export function getFingerprint() {
  return FingerprintJS.load().then((res) => res.get());
}

export async function generateFingerprint() {
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const platform = navigator.platform;

  const fingerprintSource = `${userAgent}~${language}~${screenResolution}~${timezone}~${platform}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprintSource);

  // 使用 SHA-256 生成哈希
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // 截取前16个字节并转换为32位十六进制字符串
  const hashHex = hashArray
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return hashHex;
}
