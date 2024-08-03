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
import {
  Title,
  Category,
  Add,
  Amount,
  Method,
  Source,
  Invoice,
} from '../../utils/Icons'; // Ensure you have these icons
const getColorForTransactionType = (type) => {
  switch (type) {
    case 'debit':
      return 'red'; // Danger color for debit
    case 'credit':
      return 'green'; // Success color for credit
    default:
      return '#FF7518'; // Default color
  }
};

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
  modeSourceType,
  invoices,
  mode,
}) => {
  const {
    title,
    amount,
    description,
    category,
    transaction_date,
    transaction_type,
    transaction_method,
    transaction_source_id,
    invoice,
    transaction_mode,
  } = formData;
    // Capitalize the first letter of the transactionType
    const capitalizeFirstLetter = (string) => {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const color = getColorForTransactionType(transaction_type);
  return (
    <form className="flex flex-col  items-center space-y-4 w-full lg:w-[45%]">
       <h3 style={{ color: color }}>Add {capitalizeFirstLetter(transaction_type)} Transaction</h3>
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
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </Select>
        <DatePicker
          name="date"
          label="Select the date"
          value={transaction_date}
          onChange={handleDateChange}
          isInvalid={!!errors.transaction_date}
          errorMessage={errors?.transaction_date}
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
      <div className="w-full grid grid-cols-2 gap-x-2">
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
          <SelectItem key="credit" value="credit">
            Credit
          </SelectItem>
          <SelectItem key="debit" value="debit">
            Debit
          </SelectItem>
        </Select>
        <Select
          name="invoice"
          label="Invoice"
          placeholder="Select Invoice"
          value={invoice} // Set initial value from formData
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
      </div>
      <div className="w-full grid grid-cols-2 gap-x-2">
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
          <SelectItem key="bank" value="bank">
            Bank
          </SelectItem>
          <SelectItem key="credit_card" value="credit_card">
            Credit Card
          </SelectItem>
          <SelectItem key="debit_card" value="">
            Debit Card
          </SelectItem>
          <SelectItem key="wallet" value="wallet">
            Wallet
          </SelectItem>
          <SelectItem key="upi" value="upi">
            UPI
          </SelectItem>
        </Select>
        <Select
          name="transaction_mode"
          label="Mode"
          placeholder="Select the Mode"
          value={transaction_mode}
          onChange={handleOnChange}
          isInvalid={!!errors.category}
          errorMessage={errors?.category}
          startContent={<Category />}
          className="text-gray-500"
        >
          {mode.map((cat) => (
            <SelectItem key={cat.name} value={cat.name}>
              {cat.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      {/* <div className="w-full grid grid-cols-2 gap-x-2"> */}
      <Select
        name="transaction_source_id"
        label="Transaction Source Type"
        placeholder="Select the transaction source type"
        value={transaction_source_id}
        onChange={handleOnChange}
        isInvalid={!!errors.transaction_source_id}
        errorMessage={errors?.transaction_source_id}
        startContent={<Source />}
        className="text-gray-500"
      >
        {modeSourceType.map((cat) => (
          <SelectItem key={cat.id} value={cat.id}>
            {` ${cat.id} : ${cat.bank ? cat.bank : cat.name ? cat.name : cat.upi_id}`}
          </SelectItem>
        ))}
      </Select>
      {/* <Input
        type="number"
        label="Transaction Source ID"
        placeholder="Enter the transaction source ID"
        name="transaction_source_id"
        value={transaction_source_id}
        onChange={handleOnChange}
        isInvalid={!!errors.transaction_source_id}
        errorMessage={errors?.transaction_source_id}
      />
      </div> */}

      <Button
        color={transaction_type == "debit" ? "danger" : btnColor}
        startContent={<Add />}
        className="text-white"
        isLoading={isLoading}
        onClick={handleSubmit}
        isDisabled={
          !title ||
          !amount ||
          !category ||
          !transaction_date ||
          !description ||
          !transaction_type ||
          !transaction_method ||
          hasErrors
        }
      >
        {button}
      </Button>
    </form>
  );
};

export default TransactionForm;
