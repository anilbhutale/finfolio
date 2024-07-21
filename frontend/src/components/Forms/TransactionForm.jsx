import React from 'react';
import moment from 'moment';
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { Title, Category, Add, Amount, Method, Source, Invoice } from '../../utils/Icons'; // Ensure you have these icons

const TransactionForm = ({
  categories,
  formData,
  button,
  btnColor,
  hasErrors,
  errors,
  isLoading,
  handleOnChange,
  handleDateChange,
  handleSubmit,
  transactionMethods,
  transactionSources,
  invoices,
}) => {
  const { title, amount, description, category, date, transaction_type, transaction_method, transaction_source_type, transaction_source_id, invoice } = formData;

  return (
    <form className="flex flex-col justify-center items-center space-y-4 w-full lg:w-[45%]">
      <Input
        label="Title"
        placeholder="Enter the title"
        name="title"
        value={title}
        onChange={handleOnChange}
        isInvalid={!!errors.title}
        errorMessage={errors?.title}
        startContent={<Title />}
        className="text-gray-500"
      />
      <Input
        type="number"
        label="Amount"
        placeholder="Enter the amount"
        name="amount"
        value={amount}
        onChange={handleOnChange}
        isInvalid={!!errors.amount}
        errorMessage={errors?.amount}
        startContent={<Amount />}
        className="text-gray-500"
      />
      <div className="w-full grid grid-cols-2 gap-x-2">
        <Select
          name="category"
          label="Category"
          placeholder="Select the category"
          value={category}
          onChange={handleOnChange}
          isInvalid={!!errors.category}
          errorMessage={errors?.category}
          startContent={<Category />}
          className="text-gray-500"
        >
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </Select>
        <DatePicker
          name="date"
          label="Select the date"
          value={date}
          onChange={handleDateChange}
          isInvalid={!!errors.date}
          errorMessage={errors?.date}
        />
      </div>
      <Textarea
        name="description"
        label="Description"
        placeholder="Enter your description"
        maxRows={4}
        value={description}
        onChange={handleOnChange}
        isInvalid={!!errors.description}
        errorMessage={errors?.description}
      />
      <Select
        name="transaction_type"
        label="Transaction Type"
        placeholder="Select the transaction type"
        value={transaction_type}
        onChange={handleOnChange}
        isInvalid={!!errors.transaction_type}
        errorMessage={errors?.transaction_type}
        startContent={<Category />}
        className="text-gray-500"
      >
        <SelectItem value="credit">Credit</SelectItem>
        <SelectItem value="debit">Debit</SelectItem>
      </Select>
      <Select
        name="transaction_method"
        label="Transaction Method"
        placeholder="Select the transaction method"
        value={transaction_method}
        onChange={handleOnChange}
        isInvalid={!!errors.transaction_method}
        errorMessage={errors?.transaction_method}
        startContent={<Method />}
        className="text-gray-500"
      >
        <SelectItem value="bank">Bank</SelectItem>
        <SelectItem value="credit_card">Credit Card</SelectItem>
        <SelectItem value="debit_card">Debit Card</SelectItem>
        <SelectItem value="wallet">Wallet</SelectItem>
        <SelectItem value="upi">UPI</SelectItem>
      </Select>
      <Select
        name="transaction_source_type"
        label="Transaction Source Type"
        placeholder="Select the transaction source type"
        value={transaction_source_type}
        onChange={handleOnChange}
        isInvalid={!!errors.transaction_source_type}
        errorMessage={errors?.transaction_source_type}
        startContent={<Source />}
        className="text-gray-500"
      >
        <SelectItem value="bank">Bank Account</SelectItem>
        <SelectItem value="credit_card">Credit Card</SelectItem>
        <SelectItem value="debit_card">Debit Card</SelectItem>
        <SelectItem value="wallet">Wallet</SelectItem>
        <SelectItem value="upi">UPI</SelectItem>
      </Select>
      <Input
        type="number"
        label="Transaction Source ID"
        placeholder="Enter the transaction source ID"
        name="transaction_source_id"
        value={transaction_source_id}
        onChange={handleOnChange}
        isInvalid={!!errors.transaction_source_id}
        errorMessage={errors?.transaction_source_id}
      />
      <Select
        name="invoice"
        label="Invoice"
        placeholder="Select Invoice"
        value={formData.invoice} // Set initial value from formData
        onChange={handleOnChange}
        isInvalid={!!errors.invoice} // Check for validation errors
        errorMessage={errors?.invoice} // Display error message
        startContent={<Invoice />} // Optional icon for invoice
        className="text-gray-500"
      >
        {invoices.map((invoice) => (
          <SelectItem key={invoice.id} value={invoice.id}>
            {` ${invoice.id} : ${invoice.title}`} 
          </SelectItem>
        ))}
      </Select>
      <Button
        color={btnColor}
        startContent={<Add />}
        className="text-white"
        isLoading={isLoading}
        onClick={handleSubmit}
        isDisabled={
          !title || !amount || !category || !date || !description || !transaction_type || !transaction_method || !transaction_source_type || !transaction_source_id || hasErrors
        }
      >
        {button}
      </Button>
    </form>
  );
};

export default TransactionForm;
