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
            {pane.content}
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
  panes:[],
  activeKey:"首页"
};
