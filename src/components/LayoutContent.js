/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-14
 * Time: 11:36
 */
import React, {PureComponent} from "react";
import PropsType from "prop-types";
import {Tabs} from "antd";

const {TabPane} = Tabs;

export default class LayoutContent extends PureComponent {

  onChange = activeKey => {
    console.log(activeKey);
    this.setState({activeKey});
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const {panes} = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({title: "New Tab", content: "Content of new Tab", key: activeKey});
    this.setState({panes, activeKey});
  };

  remove = targetKey => {
    let {activeKey} = this.state;

    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      activeKey = panes[0].key;
    }
    this.setState({panes, activeKey});
  };

  render() {
    const {panes,activeKey}=this.props;

    return (
      <Tabs
          activeKey={activeKey}
          onChange={this.onChange}
          onEdit={this.onEdit}
          type="editable-card"
      >
        {panes.map(pane => (
          <TabPane closable={pane.closable}
              key={pane.key}
              tab={pane.title}
          >
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

LayoutContent.propTypes={
  panes:PropsType.array,
  activeKey:PropsType.string
};

LayoutContent.defaultProps={
  panes:[],
  activeKey:"首页"
};
