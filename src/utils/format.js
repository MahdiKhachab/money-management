import { CURRENCY } from '../config/env';

const currencyFormatter = new Intl.NumberFormat('ar', {
  style: 'currency',
  currency: CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  numberingSystem: 'latn',
});

const dateFormatter = new Intl.DateTimeFormat('ar', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  numberingSystem: 'latn',
});

export const formatMoney = (value) => {
  const num = Number(value);
  return currencyFormatter.format(Number.isFinite(num) ? num : 0);
};

// Accepts "YYYY-MM-DD" (LocalDate) or an ISO datetime.
export const formatDate = (value) => {
  if (!value) return '—';
  const date = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : dateFormatter.format(date);
};

export const todayISO = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now - offset).toISOString().slice(0, 10);
};

export const sumBy = (items, key) => items.reduce((total, item) => total + (Number(item[key]) || 0), 0);

export const excerpt = (text, length = 160) => {
  if (!text) return '';
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
};
