/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-17
 * Time: 22:31
 */
import React, {PureComponent} from "react";
import { Button, Row, Col, Form, Input, Spin, Alert, Checkbox } from "antd";
import { Redirect } from "react-router-dom";
import AppConfig from "../config";
import Styles from "./Login.less";

const backgroundImage = require("../assets/sea.jpeg");
const FormItem = Form.Item;

class Login extends PureComponent {
  state={
    userName:"oy520",
    rememberUser:false,
    loading: false,
    errorMsg: "",
    errorShow: false,
    linkToIndex: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {validateFields}=this.props.form;

    validateFields((err, values) => {
      if (!err) {
        const {userName,password}=values;
        if(userName==="oy520"&&password==="oy520"){
          this.setState({ loading: false, linkToIndex: true });
        }else{
          this.setState({ loading: false, errorShow: true, errorMsg: "账户密码有误！" });
        }
      }
    });
  };

  handlePressEnter = (e) => {
    e.preventDefault();
    const { input } = this.inputRef;
    input.focus();
    input.select();
  };

  render() {
    const {loading, errorShow ,errorMsg,linkToIndex}=this.state;
    const { getFieldDecorator } = this.props.form;
    if (linkToIndex) {
      return (<Redirect to="/main" />);
    }

    const loginAlert = errorShow ? (
      <Alert banner
          message={errorMsg}
          showIcon
          type="error"
      />) :
      (<div />);

    return (
      <div style={{ height: "100vh", position: "relative" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundSize: "cover",
          backgroundImage: `url(${backgroundImage})`
        }}
        >
          <Row className={Styles.contentWrapper}>
            <Col sm={12}
                xs={0}
            >
              <h2 className={Styles.slogan}>
                欢迎使用<br />{AppConfig.appName}
              </h2>
            </Col>
            <Col className="form"
                span={12}
            >
              <Spin spinning={loading}
                  tip={"加载中"}
              >
                <form onSubmit={(e) => { this.handleSubmit(e); }}
                    style={{ padding: 30 }}
                >
                  <div className={Styles.logo}>
                    <span>{AppConfig.appName}</span>
                  </div>
                  <FormItem hasFeedback>
                    {getFieldDecorator("userName", {
                      initialValue: this.state.userName,
                      rules: [
                        {
                          required: true,
                          pattern: /^[A-Za-z0-9]{4,16}/,
                          message: "用户名有误"
                        }
                      ]
                    })(<Input autoFocus
                        onPressEnter={this.handlePressEnter}
                        placeholder="用户名"
                        size="large"
                       />)}
                  </FormItem>
                  <FormItem hasFeedback>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "密码有误"
                        }
                      ]
                    })(<Input placeholder="密码"
                        ref={(input) => { this.inputRef = input; }}
                        size="large"
                        type="password"
                       />)}
                  </FormItem>
                  {loginAlert}
                  <Row style={{ padding: 10 }}>
                    <Checkbox checked={this.state.rememberUser}
                        onChange={(e) => { this.setState({ rememberUser: e.target.checked }); }}
                    >记住账号</Checkbox>
                  </Row>
                  <Row>
                    <Button htmlType="submit"
                        shape="round"
                        size="large"
                        style={{ width: "100%" }}
                        type="primary"
                    >
                      登录
                    </Button>
                  </Row>
                  {/*<Row style={{ padding: 10, color: "#888" }}>
                    <a href="/"
                        style={{ color: "#888" }}
                    >
                      立即注册
                    </a>
                    <span style={{ marginLeft: 3, marginRight: 3 }}>|</span>
                    <a href="/"
                        style={{ color: "#888" }}
                    >
                      忘记密码
                    </a>
                  </Row>*/}
                </form>
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
