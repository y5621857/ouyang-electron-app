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
      onSelect
    }=this.props;

    return (
      <Fragment>
        <Menu
            defaultSelectedKeys={["home"]}
            mode="inline"
            onSelect={onSelect}
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
  onSelect:PropTypes.func
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
  ]
};
