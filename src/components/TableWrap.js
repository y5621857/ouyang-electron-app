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
    const {data,columns,children}=this.props;

    return (
      <div>
        {children}
        <Table bordered
            columns={columns}
            dataSource={data}
            size="small"
        />
      </div>
    );
  }
}

TableWrap.propTypes={
  data:PropTypes.array,
  columns:PropTypes.array
};

TableWrap.defaultProps={
  data:[],
  columns:[]
};
