/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-17
 * Time: 14:38
 */
import React, {PureComponent} from "react";
import {Table} from "antd";
import PropTypes from "prop-types";

export default class TableWrap extends PureComponent {
  render() {
    const {data,columns,children,selectedRowKeys,onSelectChange}=this.props;

    return (
      <div>
        {children}
        <Table bordered
            columns={columns}
            dataSource={data}
            pagination={{
              showTotal:()=>`共计 ${data.length} 条`,
              pageSizeOptions:["5","8","10","15","20"],
              showSizeChanger:true,
              showQuickJumper:true
            }}
            rowSelection={{
              selectedRowKeys:selectedRowKeys,
              onChange: onSelectChange
            }}
            size="small"
        />
      </div>
    );
  }
}

TableWrap.propTypes={
  data:PropTypes.array,
  columns:PropTypes.array,
  selectedRowKeys:PropTypes.array,
  onSelectChange:PropTypes.func
};

TableWrap.defaultProps={
  data:[],
  columns:[],
  selectedRowKeys:[]
};
