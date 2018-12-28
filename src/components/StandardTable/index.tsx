import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/es/table/interface';
import { PaginationProps } from 'antd/es/pagination/Pagination';
import styles from './index.less';

export interface StandardTableProps<T> extends TableProps<T> {
  data: {
    list?: T[];
    pagination: {
      current: number;
      total: number;
    };
  };
}

interface DefaultProps {
  paginationConfig: PaginationProps;
}

class StandardTable<T> extends React.PureComponent<StandardTableProps<T>, any> {
  static defaultProps: DefaultProps = {
    paginationConfig: {
      showQuickJumper: true,
      showSizeChanger: true
    }
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    onChange && onChange(pagination, filters, sorter);
  };

  render() {
    const { rowKey, data, pagination, ...rest } = this.props;
    const { list = [], pagination: paginationConfig } = data;

    let paginationProps;

    if (typeof pagination === 'boolean') {
      paginationProps = pagination;
    } else {
      paginationProps = {
        ...pagination,
        ...paginationConfig
      };
    }

    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={rowKey || 'key'}
          onChange={this.handleTableChange}
          {...rest}
          dataSource={list}
          pagination={paginationProps}
        />
      </div>
    );
  }
}

export default StandardTable;
