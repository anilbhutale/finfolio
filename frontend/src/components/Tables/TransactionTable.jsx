import React, { useState, useMemo } from 'react';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Chip,
  Spinner,
  Input,
  Button,
} from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { openModal as deleteModal } from '../../features/TransactionModals/deleteModal';
import { openModal as viewAndUpdateModal } from '../../features/TransactionModals/viewAndUpdateModal';
import { EyeOutline as Eye, Edit, Delete } from '../../utils/Icons';
import { MdAdd } from 'react-icons/md';

const TransactionTable = ({
  data,
  name,
  isLoading,
  chipColorMap,
  openModal,
}) => {
  const dispatch = useDispatch();

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 15;

  // Filter and sort the data
  const filteredData = useMemo(() => {
    if (!data) return [];
    const lowercasedQuery = searchQuery.toLowerCase();
    const filteredItems = data.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercasedQuery) ||
        item.description.toLowerCase().includes(lowercasedQuery) ||
        item.invoice.category.name.toLowerCase().includes(lowercasedQuery)
    );

    const sortableItems = [...filteredItems];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig, searchQuery]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        return '▲';
      }
      return '▼';
    }
    return null;
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate total income and expenses
  const income = useMemo(() => {
    return filteredData
      .filter((item) => item.transaction_type === 'credit')
      .reduce((total, item) => total + parseFloat(item.amount), 0);
  }, [filteredData]);

  const expenses = useMemo(() => {
    return filteredData
      .filter((item) => item.transaction_type === 'debit')
      .reduce((total, item) => total + parseFloat(item.amount), 0);
  }, [filteredData]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
          <div className="flex items-center text-xl lg:text-2xl">
            <h2>
              Total Income -
              <span className="text-emerald-400 ml-2">
                <NumericFormat
                  className="ml-1 text-xl lg:text-2xl"
                  value={income}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix="₹"
                />
              </span>
            </h2>
          </div>
          <div className="flex items-center text-xl lg:text-2xl">
            <h3>
              Total Expenses -
              <span className="text-red-400 ml-2 ">
                <NumericFormat
                  className="ml-1 text-xl lg:text-2xl"
                  value={expenses}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix="₹"
                />
              </span>
            </h3>
          </div>
        </div>
        <Input
          clearable
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 mt-4 lg:mt-0 pl-4"
        />
        <div className="flex justify-end ml-4">
          <Button size="sm" onClick={openModal} color="success">
            <Tooltip
              onClick={openModal}
              color="success"
              content="Add Transaction"
            >
              <MdAdd size={24} />
            </Tooltip>
          </Button>
        </div>
      </div>
      <Table
        aria-label="Transactions table"
        classNames={{
          base: 'pb-12',
          wrapper: 'h-full px-8 box-shadow-second',
          table: !data ? 'h-full' : '',
        }}
      >
        <TableHeader>
          <TableColumn
            key="title"
            onClick={() => requestSort('title')}
            className="capitalize cursor-pointer"
          >
            {name} {getSortIcon('title')}
          </TableColumn>
          <TableColumn
            key="amount"
            onClick={() => requestSort('amount')}
            className="cursor-pointer"
          >
            Amount {getSortIcon('amount')}
          </TableColumn>
          <TableColumn
            key="category"
            onClick={() => requestSort('invoice.category.name')}
            className="cursor-pointer"
          >
            Category {getSortIcon('invoice.category.name')}
          </TableColumn>
          <TableColumn
            key="transaction_method"
            onClick={() => requestSort('transaction_method')}
            className="cursor-pointer"
          >
            Method {getSortIcon('transaction_method')}
          </TableColumn>
          <TableColumn
            key="transaction_mode"
            onClick={() => requestSort('transaction_mode')}
            className="cursor-pointer"
          >
            Mode {getSortIcon('transaction_mode')}
          </TableColumn>
          <TableColumn
            key="transaction_source"
            onClick={() => requestSort('transaction_source')}
            className="cursor-pointer"
          >
            Source {getSortIcon('transaction_source')}
          </TableColumn>
          <TableColumn
            key="date"
            onClick={() => requestSort('date')}
            className="cursor-pointer"
          >
            Date {getSortIcon('date')}
          </TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={currentItems || []}
          loadingContent={<Spinner color="primary" size="lg" />}
          loadingState={isLoading ? 'loading' : 'idle'}
          emptyContent={
            !data && !isLoading
              ? `No ${name}s to display. Please add some ${name}s!`
              : ''
          }
        >
          {currentItems?.map(
            ({
              title,
              amount,
              invoice,
              invoice_data,
              transaction_source,
              transaction_method,
              transaction_type,
              transaction_mode,
              date,
              description,
              id,
            }) => (
              <TableRow key={id}>
                <TableCell className="text-primary font-calSans tracking-wider capitalize">
                  {title}
                </TableCell>
                <TableCell>₹{amount}</TableCell>
                <TableCell>
                  <Chip
                    className="capitalize"
                    color={chipColorMap[invoice_data.category.name]}
                    size="sm"
                    variant="flat"
                  >
                    {invoice_data.category.name}
                  </Chip>
                </TableCell>
                <TableCell>{transaction_method}</TableCell>
                <TableCell>{transaction_mode}</TableCell>
                <TableCell>{transaction_source}</TableCell>
                {/* <TableCell
                className={`transition-all ${
                  description.length > 20
                    ? ' hover:text-gray-400 hover:cursor-pointer'
                    : ''
                }`}
                onClick={() => {
                  if (description.length > 20) {
                    dispatch(
                      viewAndUpdateModal({
                        transaction: {
                          title,
                          amount,
                          category: invoice.category.name,
                          description,
                          date,
                        },
                        id,
                        type: name,
                        isDisabled: true,
                      })
                    );
                  }
                }}
              >
                {description.length > 20
                  ? `${description.slice(0, 20)}...`
                  : description}
              </TableCell> */}
                <TableCell>{moment(date).format('YYYY-MM-DD')}</TableCell>
                <TableCell className="relative flex items-center gap-2">
                  <Tooltip content="View More">
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={() =>
                        dispatch(
                          viewAndUpdateModal({
                            transaction: {
                              title,
                              amount,
                              category: invoice_data.category.name,
                              description,
                              date,
                            },
                            id,
                            type: name,
                            isDisabled: true,
                          })
                        )
                      }
                    >
                      <Eye />
                    </span>
                  </Tooltip>
                  <Tooltip content="Edit">
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={() =>
                        dispatch(
                          viewAndUpdateModal({
                            transaction: {
                              id,
                              title,
                              amount,
                              category: invoice_data.category.name,
                              description,
                              transaction_method,
                              date,
                              transaction_type,
                            },
                            id,
                            type: name,
                          })
                        )
                      }
                    >
                      <Edit />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() =>
                        dispatch(deleteModal({ title, id, type: name }))
                      }
                    >
                      <Delete />
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={currentPage}
            total={totalPages}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
