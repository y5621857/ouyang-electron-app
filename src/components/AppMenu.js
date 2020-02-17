/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-15
 * Time: 15:20
 */
import React ,{ PureComponent, Fragment }from "react";
import { Menu, Icon} from "antd";
import PropTypes from "prop-types";

export default class AppMenu extends PureComponent {

  render() {
    const {
      data,
      onSelect,
      defaultSelectedKeys
    }=this.props;

    return (
      <Fragment>
        <Menu
            mode="inline"
            onSelect={onSelect}
            selectedKeys={defaultSelectedKeys}
            theme="dark"
        >
          {
            data&&data.map(function(menuItem){
              return (
                <Menu.Item key={menuItem.key}>
                  {
                    menuItem.icon&&<Icon type={menuItem.icon}/>
                  }
                  <span>{menuItem.title}</span>
                </Menu.Item>
              );
            })
          }
        </Menu>
      </Fragment>
    );
  }
}

AppMenu.propTypes={
  data:PropTypes.array,
  onSelect:PropTypes.func,
  defaultSelectedKeys:PropTypes.array
};

AppMenu.defaultProps={
  data:[
    {
      title:"首页",
      key:"home",
      url:"首页",
      icon:"home"
    },
    {
      title:"客户",
      key:"custom",
      url:"客户",
      icon:"user"
    }
  ],
  defaultSelectedKeys:["home"]
};
