// Central place for build-time configuration (see .env.example).
export const API_BASE_URL = (
  process.env.REACT_APP_API_URL || 'http://localhost:8080/ZahraaAPI/api'
).replace(/\/+$/, '');

// Server root (API URL without the trailing /api), used to build links to uploaded files.
export const SERVER_URL = API_BASE_URL.replace(/\/api$/, '');

export const CURRENCY = process.env.REACT_APP_CURRENCY || 'EUR';

export const ORG_NAME = 'جمعية الزهراء الثقافية';
