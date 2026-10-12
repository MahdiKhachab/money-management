import { screen, waitFor } from '@testing-library/react';
import { loginAs, makeToken, renderApp } from './test/utils';

jest.mock('./api/contentService', () => ({
  ...jest.requireActual('./api/contentService'),
  fetchPublicContent: jest.fn(),
}));
jest.mock('./api/donorService', () => ({
  fetchDonors: jest.fn(),
  deleteDonor: jest.fn(),
}));

const { fetchPublicContent } = require('./api/contentService');
const { fetchDonors } = require('./api/donorService');

beforeEach(() => {
  localStorage.clear();
  fetchPublicContent.mockResolvedValue([
    { id: 1, type: 'NEWS', title: 'افتتاح المكتبة', description: 'خبر', createdAt: '2026-09-01T10:00:00' },
    { id: 2, type: 'ACTIVITY', title: 'ورشة الخط العربي', description: 'نشاط', createdAt: '2026-09-02T10:00:00' },
  ]);
  fetchDonors.mockResolvedValue([]);
});

test('home page shows the hero and the latest published content', async () => {
  renderApp('/');
  expect(screen.getByText(/رعاية المجتمع، بناء المستقبل، ورفع الوعي الثقافي/)).toBeInTheDocument();
  expect(await screen.findByText('افتتاح المكتبة')).toBeInTheDocument();
  expect(screen.getByText('ورشة الخط العربي')).toBeInTheDocument();
});

test('admin routes redirect to login when signed out', async () => {
  renderApp('/admin/donors');
  expect(await screen.findByRole('heading', { name: 'تسجيل الدخول' })).toBeInTheDocument();
});

test('an expired token is cleared and the user is sent to login', async () => {
  localStorage.setItem('token', makeToken({ expiresInSec: -60 }));
  renderApp('/admin');
  expect(await screen.findByRole('heading', { name: 'تسجيل الدخول' })).toBeInTheDocument();
  expect(localStorage.getItem('token')).toBeNull();
});

test('signed-in users reach the admin area', async () => {
  loginAs({ sub: 'mahdi', role: 'USER' });
  renderApp('/admin/donors');
  expect(await screen.findByRole('heading', { name: 'المتبرعون' })).toBeInTheDocument();
  // USER role does not see the admin-only menu entry
  expect(screen.queryByText('إضافة مستخدم')).not.toBeInTheDocument();
});

test('non-admins are redirected away from user management', async () => {
  loginAs({ role: 'USER' });
  renderApp('/admin/users');
  await waitFor(() => expect(screen.queryByRole('heading', { name: 'إضافة مستخدم' })).not.toBeInTheDocument());
});

test('unknown public URLs show the 404 page', () => {
  renderApp('/does-not-exist');
  expect(screen.getByRole('heading', { name: 'الصفحة غير موجودة' })).toBeInTheDocument();
});
