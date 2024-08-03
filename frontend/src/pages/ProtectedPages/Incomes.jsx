import React, { useState, useEffect } from 'react';
import { object, string, number, date } from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { parseDate } from '@internationalized/date';
import { NumericFormat } from 'react-number-format';

import { useDispatch, useSelector } from 'react-redux';
import { updateLoader } from '../../features/loader/loaderSlice';

import { TransactionForm } from '../../components/Forms';
import validateForm from '../../utils/validateForm';
import TransactionTable from '../../components/Tables/TransactionTable';
import { useGetAllTransactionsQuery } from '../../features/api/apiSlices/transactionApiSlice';
import { useGetInvoicesByCategoryQuery } from '../../features/api/apiSlices/invoiceApiSlice';
import { useGetAllInvoiceCategoriesQuery } from '../../features/api/apiSlices/InvoiceGroupSlice';
import { useGetAllBankAccountsQuery } from '../../features/api/apiSlices/bankAccountApiSlice';
import { useGetAllDebitCardsQuery } from '../../features/api/apiSlices/debitCardApiSlice';
import { useGetAllWalletsQuery } from '../../features/api/apiSlices/walletApiSlice';
import { useGetAllUpiAppsQuery } from '../../features/api/apiSlices/upiAppApiSlice';
import { useGetSelectOptionsByCategoryQuery } from '../../features/api/apiSlices/selectOptionApiSlice';
import { useCreateTransactionMutation } from '../../features/api/apiSlices/transactionApiSlice';

const Incomes = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
    category: '',
    transaction_date: parseDate(moment().format('YYYY-MM-DD')), // Initialize with today's date
    transaction_method: '',
    transaction_source_type: '',
    transaction_source_id: '',
    transaction_mode: '',
  });

  const [errors, setErrors] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isRefetchDeleteModal = useSelector(
    (state) => state.deleteTransactionModal.refetch
  );
  const isRefetchViewAndUpdateModal = useSelector(
    (state) => state.transactionViewAndUpdateModal.refetch
  );

  const [modeList, setModeList] = useState([]);
  const [modeSourceType, setSourceType] = useState([]);
  const dispatch = useDispatch();

  const {
    data: transactions = [],
    error,
    isLoading,
  } = useGetAllTransactionsQuery();
  const {
    data: invoiceCategories = [],
    error: categoriesError,
    isLoading: isLoadingCategories,
  } = useGetAllInvoiceCategoriesQuery();
  const {
    data: bankAccounts = [],
    error: accountsError,
    isLoading: isLoadingAccounts,
  } = useGetAllBankAccountsQuery();
  const {
    data: debitCards = [],
    error: debitCardsError,
    isLoading: isLoadingDebitCards,
  } = useGetAllDebitCardsQuery();
  const {
    data: creditCards = [],
    error: creditCardsError,
    isLoading: isLoadingCreditCards,
  } = useGetAllDebitCardsQuery();
  const {
    data: wallet = [],
    error: walletError,
    isLoading: isWalletLoading,
  } = useGetAllWalletsQuery({
    skip: formData.transaction_method !== 'wallet',
  });

  const {
    data: upi = [],
    error: upiError,
    isLoading: isUpiLoading,
  } = useGetAllUpiAppsQuery(undefined, {
    skip: formData.transaction_method !== 'upi',
  });

  const {
    data: category_method = [],
    error: categoryError,
    isLoading: isCategoryLoading,
  } = useGetSelectOptionsByCategoryQuery(formData.transaction_method, {
    skip:
      !['bank', 'credit_card', 'debit_card'].includes(
        formData.transaction_method
      ) || !formData.transaction_method,
  });

  const {
    data: invoices = [],
    error: invoicesError,
    isLoading: invoicesLoading,
  } = useGetInvoicesByCategoryQuery(formData.category, {
    skip: !formData.category,
  });

  const transactionMethods = [
    { label: 'Bank', value: 'bank' },
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'Debit Card', value: 'debit_card' },
    { label: 'Wallet', value: 'wallet' },
    { label: 'UPI', value: 'upi' },
  ];

  const transactionSources = [
    { label: 'Bank Account', value: 'bank' },
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'Debit Card', value: 'debit_card' },
    { label: 'Wallet', value: 'wallet' },
    { label: 'UPI', value: 'upi' },
  ];

  const validationSchema = object({
    title: string()
      .required('Title is required.')
      .min(5, 'Title must be at least 5 characters long.')
      .max(15, 'Title should not be more than 15 characters.'),
    amount: number('Amount must be a number')
      .required('Amount is required.')
      .positive('Amount must be positive.'),
    description: string()
      .required('Description is required.')
      .min(5, 'Description must be at least 5 characters long.')
      .max(80, 'Description should not be more than 80 characters.'),
    transaction_date: date().required('Date is required.'),
    category: string().required('Category is required.'),
    transaction_method: string().required('Transaction method is required.'),
    transaction_mode: string().required('Transaction method is required.'),
    transaction_source_type: string().required(
      'Transaction source type is required.'
    ),
    // transaction_source_id: number().required('Transaction source ID is required.').positive('Transaction source ID must be positive.'),
  });

  const chipColorMap = {
    salary: 'success',
    freelance: 'default',
    investments: 'success',
    rent: 'warning',
    youtube: 'danger',
    bitcoin: 'warning',
    other: 'default',
  };

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    validateForm(e.target.name, e.target.value, validationSchema, setErrors);
  };

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, transaction_date: newDate });
  };

  const [addIncome, { isLoading: addIncomeLoading }] =
    useCreateTransactionMutation();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateLoader(40));

      const formattedDate = moment({
        year: formData.transaction_date.year,
        month: formData.transaction_date.month - 1,
        day: formData.transaction_date.day,
      }).format('YYYY-MM-DD');

      const updatedFormData = {
        ...formData,
        transaction_date: formattedDate,
        transaction_source_type: '1',
      };

      const res = await addIncome(updatedFormData).unwrap();

      dispatch(updateLoader(60));
      toast.success(res.message || 'Income added successfully!');
    } catch (error) {
      toast.error(error?.data?.error || 'Unexpected Internal Server Error!');
    } finally {
      await refetch();
      dispatch(updateLoader(100));
    }
  };

  useEffect(() => {
    if (formData.transaction_method === 'wallet' && !isWalletLoading) {
      setModeList(wallet);
      setSourceType(wallet);
    } else if (formData.transaction_method === 'upi' && !isUpiLoading) {
      setModeList(upi);
      let upiApp = upi.find((app) => app.id == formData.transaction_mode);
      setSourceType(upiApp?.upi_accounts ? upiApp.upi_accounts : []);
    } else if (
      ['bank', 'credit_card', 'debit_card'].includes(
        formData.transaction_method
      ) &&
      !isCategoryLoading
    ) {
      setModeList(category_method);
    }
    if (formData.transaction_method == 'bank') {
      setSourceType(bankAccounts);
    }
    if (formData.transaction_method == 'debit_card') {
      setSourceType(debitCards);
    }
    if (formData.transaction_method == 'credit_card') {
      setSourceType(creditCards);
    }
  }, [
    formData.transaction_method,
    formData.transaction_mode,
    isWalletLoading,
    isUpiLoading,
    isCategoryLoading,
    wallet,
    upi,
    category_method,
    debitCards,
  ]);

  const hasErrors = Object.values(errors).some((error) => !!error);

  return (
    <>
      <section className="w-full h-full flex flex-col lg:flex-row px-6 md:px-8 lg:px-12 pt-6 space-y-8 lg:space-y-0 lg:space-x-8">
        <TransactionForm
          button="Submit"
          categories={invoiceCategories}
          mode={modeList}
          invoices={invoices}
          transactionMethods={transactionMethods}
          transactionSources={transactionSources}
          modeSourceType={modeSourceType}
          btnColor="success"
          formData={formData}
          errors={errors}
          hasErrors={hasErrors}
          isLoading={addIncomeLoading}
          handleOnChange={handleOnChange}
          handleDateChange={handleDateChange}
          handleSubmit={handleSubmit}
        />
        <TransactionTable
          data={transactions}
          name="income"
          chipColorMap={chipColorMap}
          rowsPerPage={10}
          isLoading={isLoading}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </>
  );
};

export default Incomes;
