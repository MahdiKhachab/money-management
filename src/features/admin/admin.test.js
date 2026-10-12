import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { loginAs, renderApp } from '../../test/utils';

jest.mock('../../api/donorService', () => ({
  fetchDonors: jest.fn(),
  deleteDonor: jest.fn(),
  createDonor: jest.fn(),
  updateDonor: jest.fn(),
  fetchDonor: jest.fn(),
}));
jest.mock('../../api/incomeService', () => ({
  fetchIncomes: jest.fn(),
  createIncome: jest.fn(),
  updateIncome: jest.fn(),
  fetchIncome: jest.fn(),
  deleteIncome: jest.fn(),
}));

const donorService = require('../../api/donorService');
const incomeService = require('../../api/incomeService');

const DONORS = [
  { id: 1, fullName: 'علي حسن', phone: '0123', email: 'ali@example.com' },
  { id: 2, fullName: 'زينب محمد', phone: '0456', email: '' },
];

beforeEach(() => {
  localStorage.clear();
  loginAs();
  jest.clearAllMocks();
  donorService.fetchDonors.mockResolvedValue(DONORS);
  incomeService.fetchIncomes.mockResolvedValue([]);
});

describe('donors list', () => {
  it('lists, searches and deletes donors', async () => {
    donorService.deleteDonor.mockResolvedValue({});
    renderApp('/admin/donors');

    expect(await screen.findByText('علي حسن')).toBeInTheDocument();
    expect(screen.getByText('زينب محمد')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/بحث بالاسم/), { target: { value: 'زينب' } });
    expect(screen.queryByText('علي حسن')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'حذف زينب محمد' }));
    const dialog = await screen.findByRole('dialog');
    fireEvent.click(within(dialog).getByRole('button', { name: 'حذف' }));

    await waitFor(() => expect(donorService.deleteDonor).toHaveBeenCalledWith(2));
    await waitFor(() => expect(screen.queryByText('زينب محمد')).not.toBeInTheDocument());
    expect(await screen.findByText('تم حذف المتبرع.')).toBeInTheDocument();
  });

  it('shows an error state with retry when loading fails', async () => {
    donorService.fetchDonors.mockRejectedValueOnce({ request: {} });
    renderApp('/admin/donors');
    expect(await screen.findByText(/تعذر الاتصال بالخادم/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'إعادة المحاولة' }));
    expect(await screen.findByText('علي حسن')).toBeInTheDocument();
  });
});

describe('income form', () => {
  it('validates input before saving', async () => {
    renderApp('/admin/incomes/new');
    fireEvent.click(await screen.findByRole('button', { name: 'حفظ' }));
    expect(await screen.findByText('أدخل مبلغاً أكبر من صفر.')).toBeInTheDocument();
    expect(incomeService.createIncome).not.toHaveBeenCalled();
  });

  it('creates an income linked to a selected donor', async () => {
    incomeService.createIncome.mockResolvedValue({ id: 10 });
    renderApp('/admin/incomes/new');

    fireEvent.change(await screen.findByLabelText(/المبلغ/), { target: { value: '150' } });
    const donorSelect = screen.getByLabelText('المتبرع');
    await screen.findByRole('option', { name: 'علي حسن' });
    fireEvent.change(donorSelect, { target: { value: '1' } });
    fireEvent.click(screen.getByRole('button', { name: 'حفظ' }));

    await waitFor(() =>
      expect(incomeService.createIncome).toHaveBeenCalledWith(expect.objectContaining({ amount: 150, donorId: 1, sourceType: 'CASH' }))
    );
    // returns to the list after saving
    expect(await screen.findByRole('heading', { name: 'الإيرادات' })).toBeInTheDocument();
  });

  it('loads the record in edit mode and updates it', async () => {
    incomeService.fetchIncome.mockResolvedValue({ id: 5, amount: 80, sourceType: 'ONLINE', dateReceived: '2026-03-04', donorId: null, description: 'زكاة' });
    incomeService.updateIncome.mockResolvedValue({});
    renderApp('/admin/incomes/5/edit');

    expect(await screen.findByDisplayValue('زكاة')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'حفظ التعديلات' }));
    await waitFor(() => expect(incomeService.updateIncome).toHaveBeenCalledWith('5', expect.objectContaining({ amount: 80, donorId: null })));
  });
});
