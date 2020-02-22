/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-21
 * Time: 13:36
 */
import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Form, Input, Button, Alert,message} from "antd";
import UEditor from "../Common/UEditor";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

const UE=window.UE;

class MsgTemplateForm extends PureComponent {
  componentDidMount() {
    const {type,curMsg}=this.props;
    if(type==="update"){
      const ueditor=UE.getEditor("ueditor");
      setTimeout(()=>{
        ueditor.setContent(curMsg.html);
      },500);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {onSubmit,type,curMsg}=this.props;
    const {validateFields}=this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const submitType=type==="update"?"update":"insert";
        const ueditor=UE.getEditor("ueditor");
        const html = ueditor.getContent();
        const content = ueditor.getContentTxt();

        if(!content.replace(" ","")){
          message.error("请填写短信内容");
          return;
        }

        let params = {
          ...curMsg,
          ...values,
          html,
          content
        };

        onSubmit(submitType,params);
      }
    });
  };

  render() {
    const { type, curMsg }=this.props;
    const { getFieldDecorator } = this.props.form;
    const isUpdate = type==="update";

    return (
      <Form onSubmit={this.onSubmit}
          {...formItemLayout}
      >
        <Form.Item label="模板名称">
          {getFieldDecorator("name", {
            initialValue:isUpdate?curMsg.name:"",
            rules: [
              {
                required: true,
                message: "不能为空!"
              }
            ]
          })(<Input placeholder="请输入"/>)}
        </Form.Item>
        <Form.Item label="模板内容">
          <Alert message={
            <div>
              <div>1、用户名请用 <span style={{color:"red"}}>$NAME$</span> 代替，生成短信时将会是对应的用户姓名</div>
              <div>2、祝福语请用 <span style={{color:"red"}}>$SEX$</span> 代替，生成短信时将会是对应的用户性别</div>
              <div>3、祝福语请用 <span style={{color:"red"}}>$REMARK$</span> 代替，生成短信时将会是对应的用户备注</div>
              <div>4、祝福语请用 <span style={{color:"red"}}>$CONTENT$</span> 代替，生成短信时将会是对应的祝福语内容</div>
            </div>
          }
          />
          <UEditor />
        </Form.Item>
        <Form.Item labelCol={{span:0}}
            style={{textAlign:"right"}}
            wrapperCol={{span:24}}
        >
          <Button htmlType="submit"
              type="primary"
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(MsgTemplateForm);

MsgTemplateForm.propTypes={
  type:PropTypes.string,
  curMsg:PropTypes.object,
  onSubmit:PropTypes.func
};

MsgTemplateForm.defaultProps={
  type:"insert",
  curMsg:{},
  onSubmit:()=>{}
};
