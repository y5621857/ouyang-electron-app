import React, {PureComponent} from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import BlockLayout from "./components/BlockLayout";
import "moment/locale/zh-cn";
// import logo from "./logo.svg";
import "./App.css";

export default class App extends PureComponent {

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <BlockLayout/>
      </ConfigProvider>
      );
  }
}
