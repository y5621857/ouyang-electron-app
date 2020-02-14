/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-14
 * Time: 11:36
 */
import React, {PureComponent} from "react";
import {Tabs} from "antd";

const {TabPane} = Tabs;

export default class LayoutContent extends PureComponent {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      {
        title: "首页",
        content: "Content of Tab 1",
        key: "1",
        closable: false
      },
      {
        title: "Tab 2",
        content: "Content of Tab 2",
        key: "2"
      },
      {
        title: "Tab 3",
        content: "Content of Tab 3",
        key: "3"
      }
    ];
    this.state = {
      activeKey: panes[0].key,
      panes
    };
  }

  onChange = activeKey => {
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
    const {panes} = this.state;

    return (
      <Tabs
          activeKey={this.state.activeKey}
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
