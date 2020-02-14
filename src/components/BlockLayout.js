/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-14
 * Time: 11:30
 */
import React, {PureComponent} from "react";

import {Layout, Menu, Icon, Avatar} from "antd";
import LayoutContent from "./LayoutContent";

const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;

export default class BlockLayout extends PureComponent {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({collapsed});
  };

  render() {
    const {collapsed} = this.state;

    return (
      <Layout style={{minHeight: "100vh"}}>
        <Sider
            collapsed={collapsed}
            collapsible
            onCollapse={this.onCollapse}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
        >
          <div className="logo"/>
          <Menu defaultSelectedKeys={["1"]}
              mode="inline"
              theme="dark"
          >
            <Menu.Item key="1">
              <Icon type="pie-chart"/>
              <span>首页</span>
            </Menu.Item>
            <SubMenu
                key="sub1"
                title={
                <span>
                  <Icon type="user"/>
                  <span>客户</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{marginLeft: (collapsed ? 80 : 200),transition:"all .2s"}}>
          <Header style={{background: "#fff", padding: 0}}>
            <div style={{position: "absolute", right: 10}}>
              <Avatar icon="user"
                  style={{backgroundColor: "#87d068"}}
              /><span style={{paddingLeft: 6}}>欧阳晓君</span>
            </div>
          </Header>
          <Content style={{margin: "6px"}}>
            <div style={{background: "#fff", minHeight: 360}}>
              <LayoutContent/>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
