/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-14
 * Time: 11:30
 */
import React, {PureComponent} from "react";
import AppConfig from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAirFreshener } from "@fortawesome/free-solid-svg-icons";
import {Layout, Avatar} from "antd";
import AppMenu from "./AppMenu";
import LayoutContent from "./LayoutContent";
import Home from "../pages/Home";
import Custom from "../pages/Customer";
import _ from "lodash";
import Styles from "./BlockLayout.less";

const {Header, Content, Sider} = Layout;

const ContentMap={
  [AppConfig.menu.home.key]:<Home/>,
  [AppConfig.menu.custom.key]:<Custom/>
};

export default class BlockLayout extends PureComponent {
  state = {
    collapsed: false,
    activeKey:AppConfig.menu.home.key,
    menuTagList:[
      {
        title:AppConfig.menu.home.title,
        key:AppConfig.menu.home.key,
        content:ContentMap.home,
        closable: false
      }
    ]
  };

  onCollapse = collapsed => {
    this.setState({collapsed});
  };

  menuOnSelect = ({key}) => {
    this.panItemChangeHandle(key,"add");
  };

  panOnRemove = (key,action) => {
    this.panItemChangeHandle(key,action);
  };

  panOnChange = (activeKey) => {
    this.setState({
      activeKey
    });
  };

  panItemChangeHandle = (key, action) => {
    const {menuTagList}=this.state;
    const _menuTagList = _.cloneDeep(menuTagList);

    if(action==="add"){
      const hasMenu = _.findIndex(menuTagList,(o)=>{
        return o.key===key;
      });

      // eslint-disable-next-line no-prototype-builtins
      if(hasMenu===-1&& AppConfig&& AppConfig.menu&& AppConfig.menu.hasOwnProperty(key)){
        _menuTagList.push({
          title:AppConfig.menu[key].title,
          key:AppConfig.menu[key].key,
          content:ContentMap[key]
        });

        this.setState({
          menuTagList:_menuTagList,
          activeKey: key
        });
      }else{
        this.setState({
          activeKey: key
        });
      }
    }

    if(action==="remove"){
      const _curIndex=_.findIndex(menuTagList,(o)=>{
        return o.key===key;
      });

      const _activeKey=menuTagList[_curIndex-1].key;

      _.remove(_menuTagList, (o) => {
        return o.key === key;
      });

      this.setState({
        menuTagList:_menuTagList,
        activeKey:_activeKey
      });
    }
  };

  render() {
    const {collapsed,menuTagList,activeKey} = this.state;

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
          <div className={Styles.logo}>
            <FontAwesomeIcon icon={faAirFreshener} />
            <span className={Styles.logoTitle}
                style={{paddingLeft:collapsed?0:12}}
            >{!collapsed&&"欧阳管理系统"}</span>
          </div>
          <AppMenu
              defaultSelectedKeys={[activeKey]}
              onSelect={this.menuOnSelect}
          />
        </Sider>
        <Layout style={{marginLeft: (collapsed ? 80 : 200),transition:"all .2s"}}>
          <Header style={{background: "#fff", padding: 0}}>
            <div style={{position: "absolute", right: 10}}>
              <Avatar icon="user"
                  style={{backgroundColor: "#87d068"}}
              /><span style={{paddingLeft: 6}}>{AppConfig.appName}</span>
            </div>
          </Header>
          <Content style={{margin: "6px"}}>
            <div style={{background: "#fff", minHeight: 360}}>
              <LayoutContent
                  activeKey={activeKey}
                  onChange={this.panOnChange}
                  onEdit={this.panOnRemove}
                  panes={menuTagList}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
