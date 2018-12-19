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
  // 分页相关配置
  paginationConfig?: PaginationProps;
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
    const { rowKey, data, paginationConfig, ...rest } = this.props;
    const { list = [], pagination } = data;

    const paginationProps = {
      ...paginationConfig,
      ...pagination
    };

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
