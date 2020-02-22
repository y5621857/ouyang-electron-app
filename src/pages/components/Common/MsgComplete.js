/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-22
 * Time: 12:58
 */
import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import { Alert } from "antd";
import UEditor from "./UEditor";

const UE=window.UE;

export default class MsgComplete extends PureComponent {
  componentDidMount() {
    const {msg}=this.props;
    const ueditor=UE.getEditor("ueditor");
    setTimeout(()=>{
      ueditor.setContent(msg);
    },500);
  }

  render() {
    return (
      <div>
        <Alert message="短信已生成，请将短信内容复制发送给您的客户！祝您使用愉快"
            style={{marginBottom:8}}
        />
        <div>
          <UEditor/>
        </div>
      </div>
    );
  }
}

MsgComplete.propTypes={
  msg:PropTypes.string
};

MsgComplete.defaultProps={
  msg:""
};
