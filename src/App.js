import React, {PureComponent} from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import Login from "./pages/Login";
import BlockLayout from "./components/BlockLayout";
import "moment/locale/zh-cn";
// import logo from "./logo.svg";
import "./App.css";

export default class App extends PureComponent {

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <HashRouter>
          <Switch>
            <Route component={BlockLayout}
                exact
                path="/Main"
            />
            <Route component={Login}
                exact
                path="/"
            />
          </Switch>
        </HashRouter>
      </ConfigProvider>
    );
  }
}
