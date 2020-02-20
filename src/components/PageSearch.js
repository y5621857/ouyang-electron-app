/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-17
 * Time: 14:53
 */
import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";
import Styles from "./PageSearch.less";

class PageSearch extends PureComponent {
  searchItemRender = () => {
    const {searchData}=this.props;
    const { getFieldDecorator } = this.props.form;

    return searchData.map((o)=>{
      let _nodeItem=null;
      if(o.type==="input"){
        _nodeItem = (
          <Form.Item key={o.key}>
            {getFieldDecorator(o.key, {
            })(
              <Input placeholder={o.label}/>
            )}
          </Form.Item>
        );
      }

      return _nodeItem;
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {onSubmit}=this.props;
    const {validateFields}=this.props.form;
    validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  onReset = (e) => {
    e.preventDefault();
    const {onReset} = this.props;
    const {resetFields} = this.props.form;
    resetFields();
    onReset("reset");
  };

  render() {
    const {okText,cancleText}=this.props;
    const ItemNode = this.searchItemRender();

    return (
      <div className={Styles.ContentWrap}>
        <Form layout="inline"
            onSubmit={this.onSubmit}
        >
          {ItemNode}
          <Form.Item>
            <Button htmlType="submit"
                type="primary"
            >
              {okText}
            </Button>
            <Button onClick={this.onReset}
                style={{marginLeft:8}}
            >
              {cancleText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

PageSearch.propTypes={
  onSubmit:PropTypes.func,
  onReset:PropTypes.func,
  okText:PropTypes.string,
  cancleText:PropTypes.string,
  searchData:PropTypes.array
};

PageSearch.defaultProps={
  okText:"搜索",
  cancleText:"重置",
  searchData:[
    {
      label:"姓名",
      key:"name",
      type:"input",
      default:""
    }
  ],
  onSubmit:()=>{},
  onReset:()=>{}
};

export default Form.create()(PageSearch);
