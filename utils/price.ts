export function formatPrice(value: string | number, currency?: string) {
  if (value != null) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
    }).format(Number(value));
  }
}
