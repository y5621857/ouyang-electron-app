/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-21
 * Time: 10:11
 */
import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import { Divider, Popconfirm, Modal, Icon } from "antd";
import storeHelper from "../../../utils/storeHelper";
import {flattenArr, objToArr} from "../../../utils/helper";
import TableWrap from "../../../components/TableWrap";

export default class MsgTeplate extends PureComponent {
  state={
    data:[]
  };

  componentDidMount() {
    this.updateComponent();
  }

  updateComponent = () => {
    const data = storeHelper.getItem("msgTemplate") || [];

    this.setState({
      data
    });
  };

  checkRow = (record) => {
    const {hasSentiment, onSubmit}=this.props;
    if(hasSentiment){
      Modal.confirm({
        content:"确定使用这条短信模板吗？",
        icon:<Icon type="question-circle" />,
        centered:true,
        onOk:()=>{
          onSubmit(record);
        }
      });
    }
  };

  editorMsg = (e,record) => {
    e.stopPropagation();
    const {onEditer}=this.props;
    onEditer(true,"update",record);
  };

  deleteMsg = (e,record) => {
    e.stopPropagation();
    const data = storeHelper.getItem("msgTemplate") || [];

    let _data = flattenArr(data);
    delete _data[record.id];
    _data= objToArr(_data);

    this.setState({
      data:_data
    },()=>{
      storeHelper.setItem("msgTemplate",_data);
    });
  };

  render() {
    const {data}=this.state;
    const {children}=this.props;

    const columns = [
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width:120,
        render: text => <a>{text}</a>
      },
      {
        title: "模板内容",
        dataIndex: "content",
        key: "birthday"
      },
      {
        title: "操作",
        key: "action",
        width:90,
        // eslint-disable-next-line no-unused-vars
        render: (text, record) => (
          <Fragment>
            <span >
              <a onClick={(e)=>this.editorMsg(e, record)}>编辑</a>
            </span>
            <Divider type="vertical"/>
            <span onClick={(e)=>{
                    e.stopPropagation();
                  }}
            >
              <Popconfirm cancelText="取消"
                  okText="确定"
                  onConfirm={(e)=>{
                    this.deleteMsg(e, record);
                  }}
                  placement="topLeft"
                  title="确定删除这个短信模板吗?"
              >
                <a style={{color:"red"}}>删除</a>
              </Popconfirm>
            </span>
          </Fragment>
        )
      }
    ];

    return (
      <div>
        {children}
        <div>
          <TableWrap columns={columns}
              data={data}
              needCheckBox={false}
              rowClick={this.checkRow}
          />
        </div>
      </div>
    );
  }
}

MsgTeplate.defaultProps={
  hasSentiment:false,
  onSubmit:()=>{},
  onEditer:()=>{}
};

MsgTeplate.propTypes={
  hasSentiment:PropTypes.bool,
  onSubmit:PropTypes.func,
  onEditer:PropTypes.func
};
