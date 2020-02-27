/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-26
 * Time: 17:02
 */
import React, {PureComponent} from "react";
import { Spin, Icon } from "antd";
import PropTypes from "prop-types";
import Styles from "./Loading.less";

export default class Loading extends PureComponent {
  render() {
    const {text}=this.props;

    return (
      <div className={Styles.loadingCompent}>
        <div style={{textAlign:"center"}}>
          <Spin indicator={
              <Icon spin
                  type="sync"
              />
            }
          />
          <div className={Styles.loadingText}>{text}</div>
        </div>
      </div>
    );
  }
}

Loading.defaultProps={
  text:"处理中..."
};

Loading.propTypes={
  text:PropTypes.string
};
