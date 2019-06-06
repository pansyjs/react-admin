import React, { useState } from 'react';
import classNames from 'classnames';
import { Table } from 'antd';
import { PaginationConfig, TableProps, SorterResult, TableCurrentDataSource } from 'antd/es/table';
import './standard-table.less';

export interface ITableData<T> {
  list: T[];
  pagination?: PaginationConfig;
}

interface IProps<T> extends TableProps<T> {
  onSelectRow?: (rows: T[]) => void;
  data: ITableData<T>;
  selectedRows?: T[];
  onChange?: (
    pagination: PaginationConfig,
    filters: Record<keyof T, string[]>,
    sorter: SorterResult<T>,
    extra?: TableCurrentDataSource<T>,
  ) => void;
}

const StandardTable: React.FC<IProps<any>> = props => {
  const { className, prefixCls, style, rowKey, data, onChange, onSelectRow, ...restProps } = props;
  const { list = [], pagination } = data;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>([]);

  const handleTableChange = (pagination, filters, sorter) => {
    onChange && onChange(pagination, filters, sorter);
  };

  const handleShowTotal = (total, range) => {
    return `共 ${total} 条`;
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: handleShowTotal,
    pageSizeOptions: ['10', '30', '50'],
    ...pagination,
  };

  const handleRowSelectChange = (selectedRowKeys: string[] | number[], selectedRows: any[]) => {
    onSelectRow && onSelectRow(selectedRows);

    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleRowSelectChange,
  };

  return (
    <Table
      className={classNames(className, {
        [`${prefixCls}`]: true,
      })}
      style={style}
      rowKey={rowKey}
      dataSource={list}
      rowSelection={onSelectRow ? rowSelection : null}
      pagination={paginationProps}
      onChange={handleTableChange}
      {...restProps}
    />
  );
};

StandardTable.defaultProps = {
  prefixCls: 'lotus-standard-table',
  rowKey: 'id',
};

export default StandardTable;
