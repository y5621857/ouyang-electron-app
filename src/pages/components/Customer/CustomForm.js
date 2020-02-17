/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-17
 * Time: 16:27
 */
import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Form, Input, InputNumber, Select, DatePicker, Button} from "antd";
import moment from "moment";
import AppConifg from "../../../config";

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

class CustomForm extends PureComponent {
  onSubmit = (e) => {
    e.preventDefault();
    const {onSubmit,type,curCustom}=this.props;
    const {validateFields}=this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const submitType=type==="update"?"update":"insert";

        let params = {
          ...curCustom,
          ...values,
          birthday:values.birthday?moment(values.birthday).format("YYYY-MM-DD"):"",
          mounthDay:values.birthday?moment(values.birthday).format("MM-DD"):"",
          tags:values.tags?values.tags:[]
        };

        onSubmit(submitType,false,params);
      }
    });
  };

  render() {
    const { type, curCustom }=this.props;
    const { getFieldDecorator } = this.props.form;
    const isUpdate = type==="update";

    return (
      <Form {...formItemLayout}>
        <Form.Item label="姓名">
          {getFieldDecorator("name", {
            initialValue:isUpdate?curCustom.name:"",
            rules: [
              {
                required: true,
                message: "不能为空!"
              }
            ]
          })(<Input placeholder="请输入"/>)}
        </Form.Item>
        <Form.Item label="年龄">
          {getFieldDecorator("age", {
            initialValue:isUpdate?curCustom.age:1
          })(<InputNumber max={99}
              min={1}
             />)}
        </Form.Item>
        <Form.Item label="生日">
          {getFieldDecorator("birthday", {
            initialValue:isUpdate?(moment(curCustom.birthday).isValid()?moment(curCustom.birthday):moment()):1
          })(<DatePicker format="YYYY-MM-DD"/>)}
        </Form.Item>
        <Form.Item label="备注">
          {getFieldDecorator("tags", {
            initialValue:isUpdate?curCustom.tags:[]
          })(
            <Select mode="multiple"
                placeholder="请选择"
            >
              {
                AppConifg.userTags && AppConifg.userTags.map((o,index)=>(
                  <Select.Option key={index}
                      value={o.key}
                  >{o.title}</Select.Option>
                ))
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item labelCol={{span:0}}
            style={{textAlign:"right"}}
            wrapperCol={{span:24}}
        >
          <Button onClick={this.onSubmit}
              type="primary"
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

CustomForm.propTypes={
  type:PropTypes.string,
  curCustom:PropTypes.object,
  onSubmit:PropTypes.func
};

CustomForm.defaultProps={
  type:"insert",
  curCustom:{
    age:1
  }
};

export default Form.create()(CustomForm);
