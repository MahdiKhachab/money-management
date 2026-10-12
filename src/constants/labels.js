// Arabic labels for the backend enums (keep in sync with com.alzahraa...enums).

export const INCOME_SOURCES = {
  CASH: 'نقداً',
  BANK_TRANSFER: 'تحويل بنكي',
  CHECK: 'شيك',
  ONLINE: 'إلكتروني',
  OTHER: 'أخرى',
};

export const EXPENSE_CATEGORIES = {
  MAINTENANCE: 'صيانة',
  EVENT: 'فعالية',
  ELECTRICITY: 'كهرباء',
  MOSQUE_SUPPLY: 'مستلزمات المسجد',
  STAFF: 'الموظفين',
  OTHER: 'أخرى',
};

export const MAINTENANCE_TYPES = {
  REPAIR: 'إصلاح',
  REPLACEMENT: 'استبدال',
  INSTALLATION: 'تركيب',
  CLEANING: 'تنظيف',
  OTHER: 'أخرى',
};

export const CONTENT_TYPES = {
  NEWS: 'خبر',
  ACTIVITY: 'نشاط',
  ABOUT: 'عن الجمعية',
};

export const USER_ROLES = {
  ADMIN: 'مدير',
  USER: 'مستخدم',
};

export const MONTHS = [
  'كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران',
  'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول',
];

export const toOptions = (labels) => Object.entries(labels).map(([value, label]) => ({ value, label }));
