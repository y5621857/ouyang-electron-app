/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-14
 * Time: 11:36
 */
import React, {PureComponent} from "react";
import PropsType from "prop-types";
import {Tabs} from "antd";
import Home from "../pages/Home";
import Custom from "../pages/Customer";
import BrithdayUser from "../pages/BrithdayUser";
import AppConig from "../config";

const {TabPane} = Tabs;

export default class LayoutContent extends PureComponent {

  curContent = (key, activeKey) => {
    let curComponent = null;

    switch ( key ) {
      case AppConig.menu.home.key:
        curComponent = <Home show={activeKey===AppConig.menu.home.key}/>;
        break;
      case AppConig.menu.custom.key:
        curComponent = <Custom show={activeKey===AppConig.menu.custom.key}/>;
        break;
      case AppConig.menu.brithdayUser.key:
        curComponent = <BrithdayUser show={activeKey===AppConig.menu.brithdayUser.key}/>;
        break;
      default:
    }

    return curComponent;
  };

  render() {
    const {panes,activeKey,onChange,onEdit}=this.props;

    return (
      <Tabs
          activeKey={activeKey}
          hideAdd
          onChange={onChange}
          onEdit={onEdit}
          type="editable-card"
      >
        {panes.map(pane => (
          <TabPane closable={pane.closable}
              key={pane.key}
              tab={pane.title}
          >
            {
              this.curContent(pane.key, activeKey)
            }
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

LayoutContent.propTypes={
  panes:PropsType.array,
  activeKey:PropsType.string,
  onChange:PropsType.func,
  onEdit:PropsType.func
};

LayoutContent.defaultProps={
  contentMap:[],
  panes:[],
  activeKey:"首页"
};
