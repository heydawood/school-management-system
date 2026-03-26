import React, { type FC, useMemo, useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import Loader from '../loader/Loader';
import { Checkbox } from '../checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../select';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@/Utils/Icons';

interface ColumnType<T> {
  title: React.ReactNode;
  dataIndex: keyof T;
  key: string;
  sorter?: (a: T, b: T) => number;
  render?: (value: any, record: T, index: number) => React.ReactNode; // For custom rendering
}

interface RowSelection<T> {
  selectedRowKeys: React.Key[];
  onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
}

interface TableProps<T> {
  columns: ColumnType<T>[];
  dataSource: T[];
  loading?: boolean;
  tableStyle?: string;
  headerStyle?: string;
  scrollAble?: boolean;
  tableHeightClass?: string;
  rowKey: keyof T;
  pagination?: {
    totalItems: number;
    totalPages: number;
    itemCount: number;
    itemsPerPage: number;
    currentPage: number;
    setitemsPerPage?: (size: number) => void;
    onPageChange: (page: number) => void;
  };
  search?: string;
  rowSelection?: RowSelection<T>;
}

const Spinner = () => <div className="w-8 h-8 rounded-full animate-spin border-2 border-solid border-primary border-t-transparent"></div>;

const Table: FC<TableProps<any>> = ({
  columns,
  dataSource,
  loading = false,
  tableStyle = '',
  headerStyle = '',
  rowKey,
  pagination,
  search = '',
  rowSelection,
  scrollAble = false,
  tableHeightClass = '',
}) => {
  const [sortInfo, setSortInfo] = useState<{
    key: string;
    order: 'asc' | 'desc' | null;
  }>({ key: '', order: null });
  const [currentPageSelections, setCurrentPageSelections] = useState<React.Key[]>([]);
  const filteredData = useMemo(() => {
    let filtered = dataSource ? [...dataSource] : [];

    if (search) {
      filtered = dataSource?.filter((item) => columns.some((col) => String(item[col.dataIndex]).toLowerCase().includes(search.toLowerCase())));
    }

    if (sortInfo.order && sortInfo.key) {
      const column = columns.find((col) => col.key === sortInfo.key);
      if (column?.sorter) {
        filtered.sort((a, b) => (sortInfo.order === 'asc' ? column.sorter!(a, b) : column.sorter!(b, a)));
      }
    }

    return filtered;
  }, [dataSource, columns, search, sortInfo]);

  useEffect(() => {
    setCurrentPageSelections([]);
    rowSelection?.onChange([], []);
  }, [pagination?.currentPage]);

  const handleSort = useCallback((key: string) => {
    setSortInfo((prev) => ({
      key,
      order: prev.order === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const renderSorterIcon = (fieldName: string) => {
    if (sortInfo.key !== fieldName) {
      return (
        <div className="ml-2">
          <span>
            <ChevronUpDownIcon className="hover:text-primary p-0 cursor-pointer" size={16} />
          </span>
        </div>
      );
    }
    return sortInfo.order === 'asc' ? (
      <div className="ml-2">
        <span>
          <ChevronDownIcon className="hover:text-primary p-0 cursor-pointer" size={16} />
        </span>{' '}
      </div>
    ) : (
      <div className="ml-2 flex flex-col gap-0 items-center leading-none">
        <span>
          <ChevronUpIcon className=" hover:text-primary p-0 cursor-pointer" size={16} />
        </span>
      </div>
    );
  };

  const renderPageNumbers = () => {
    const currentPage = pagination?.currentPage;
    const totalPages = pagination?.totalPages;
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages! <= 5) {
      for (let i = 1; i <= totalPages!; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => pagination?.onPageChange(i)}
            className={clsx(
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold cursor-pointer',
              currentPage === i ? 'z-10 bg-primary border-neutral-975 text-muted' : 'border border-neutral-975 hover:bg-primary-50',
            )}
          >
            {i}
          </span>,
        );
      }
      return pageNumbers;
    }

    // Handle cases with more than 5 pages
    const startPage = Math.max(1, currentPage! - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages!, startPage + maxVisiblePages - 1);

    // Show ellipsis at the beginning if necessary
    if (startPage > 1) {
      pageNumbers.push(
        <span key="dots1" className="relative inline-flex border border-neutral-975 items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-primary-50">
          ...
        </span>,
      );
    }

    // Render page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => pagination?.onPageChange(i)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold cursor-pointer',
            currentPage === i ? 'z-10 bg-primary border-neutral-975 text-muted' : 'border border-neutral-975 jameel-deactive hover:bg-primary-50',
          )}
        >
          {i}
        </span>,
      );
    }

    // Show ellipsis at the end if necessary
    if (endPage < totalPages!) {
      pageNumbers.push(
        <span key="dots2" className="relative hover:bg-primary-50 inline-flex border border-neutral-975 items-center px-4 py-2 text-sm font-semibold text-gray-700">
          ...
        </span>,
      );
    }

    return pageNumbers;
  };

  const paginatedData = useMemo(() => {
    // if (!pagination)
    return filteredData;
    // const start = (pagination.currentPage - 1) * pagination.itemsPerPage
    // const end = start + pagination.itemsPerPage
    // return filteredData.slice(start, end)
  }, [filteredData, pagination]);

  const handleHeaderCheckboxChange = (checked: boolean) => {
    const pageKeys = paginatedData.map((item) => item[rowKey]);

    const updatedPageSelections = checked ? pageKeys : [];
    setCurrentPageSelections(updatedPageSelections);

    const selectedKeys = rowSelection?.selectedRowKeys || [];
    const updatedSelectedKeys = checked ? [...selectedKeys, ...pageKeys.filter((key) => !selectedKeys.includes(key))] : selectedKeys.filter((key) => !pageKeys.includes(key));

    const selectedRows = dataSource?.filter((row) => updatedSelectedKeys.includes(row[rowKey]));
    rowSelection?.onChange(updatedSelectedKeys, selectedRows);
  };

  const handleRowSelectionChange = (checked: boolean, record: any) => {
    const selectedRowKeys = rowSelection?.selectedRowKeys || [];
    const updatedSelectedKeys = checked ? [...selectedRowKeys, record[rowKey]] : selectedRowKeys.filter((key) => key !== record[rowKey]);

    const selectedRows = dataSource?.filter((row) => updatedSelectedKeys.includes(row[rowKey]));
    rowSelection?.onChange(updatedSelectedKeys, selectedRows);
  };

  return (
    <div>
      <div className={`overflow-x-auto relative ${scrollAble ? tableHeightClass + ' overflow-y-auto' : ''}`}>
        <table className={clsx('min-w-full h-full rounded-lg bg-white overflow-x-auto', tableStyle)}>
          <thead className={`${scrollAble ? 'sticky top-0 z-10' : ''}`}>
            <tr className={clsx(' py-4', headerStyle)}>
              {rowSelection && (
                <th className="px-4 py-2 rounded-tl-xl bg-white">
                  <Checkbox
                    checked={currentPageSelections.length > 0 && currentPageSelections.length === paginatedData.length}
                    onChange={(e) => handleHeaderCheckboxChange(currentPageSelections.length > 0 && currentPageSelections.length === paginatedData.length)}
                  />
                </th>
              )}
              {columns.map((column, index) => {
                const isFirst = index === 0 && !rowSelection;
                const isLast = index === columns.length - 1;

                return (
                  <th
                    key={column.key}
                    className={clsx('px-4 py-4 text-left font-semibold select-none bg-gray-lighter', isFirst && 'rounded-l-xl', isLast && 'rounded-r-xl')}
                    onClick={() => column.sorter && handleSort(column.key)}
                  >
                    <div className="flex items-center text-nowrap text-sm font-semibold capitalize">
                      {column.title}
                      {column.sorter && renderSorterIcon(column.key)}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="max-h-[200px]">
            {paginatedData?.length > 0 ? (
              paginatedData?.map((item, index) => (
                <tr key={index} className={index !== paginatedData.length - 1 ? 'border-b border-neutral-975' : ''}>
                  {rowSelection && (
                    <td className="px-4 py-2">
                      <Checkbox
                        checked={rowSelection.selectedRowKeys.includes(item[rowKey])}
                        onChange={(checked: any) => handleRowSelectionChange(checked.target?.checked, item)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-2">
                      {column.render ? column.render(item[column.dataIndex], item, index) : item[column.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (rowSelection ? 1 : 0)} className="text-center py-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {loading && (
          <div className="absolute inset-0 flex justify-center pt-16 bg-black-8 rounded-lg">
            <Spinner />
          </div>
        )}
      </div>

      {pagination && (
        <div className="flex p-4 items-center justify-center md:justify-between mt-4">
          <div className="hidden  md:flex justify-between items-center gap-3">
            <Select
              value={`${pagination.itemsPerPage}`}
              onValueChange={(value) => {
                pagination.setitemsPerPage!(Number(value));
              }}
            >
              <SelectTrigger className="w-[100px] border-theme-border">
                <SelectValue placeholder="Select a vlue" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    { label: 10, value: '10' },
                    { label: 25, value: '25' },
                    { label: 50, value: '50' },
                    { label: 100, value: '100' },
                  ].map((el) => (
                    <SelectItem className={`hover:bg-primary-lightest ${`${pagination.itemsPerPage}` == el.value && 'bg-primary-lightest'}`} value={`${el.value}`} key={el.value}>
                      {el.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-gray-500">
              Showing {Math.min((pagination.currentPage - 1) * pagination.itemsPerPage + 1)} to {Math.min(pagination.currentPage * pagination.itemsPerPage)} of{' '}
              {pagination.totalItems} entries
            </span>
          </div>
          <div>
            <nav aria-label="Pagination" className="isolate inline-flex justify-center -space-x-px rounded-md shadow-sm">
              <span
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 border border-neutral-975 hover:bg-primary-50 ${
                  pagination.currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
                onClick={() => {
                  if (pagination.currentPage > 1) {
                    pagination.onPageChange(pagination.currentPage - 1);
                  }
                }}
              >
                <IoMdArrowBack />
              </span>

              {renderPageNumbers()}

              <span
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 border border-neutral-975 hover:bg-primary-50 ${
                  pagination.currentPage >= Math.ceil(pagination.totalItems / pagination.itemsPerPage) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
                onClick={() => {
                  if (pagination.currentPage < Math.ceil(pagination.totalItems / pagination.itemsPerPage)) {
                    pagination.onPageChange(pagination.currentPage + 1);
                  }
                }}
              >
                <IoMdArrowForward />
              </span>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
