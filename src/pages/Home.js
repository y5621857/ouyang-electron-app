/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-14
 * Time: 11:24
 */
import React, {PureComponent} from "react";
import AppConfig from "../config";
import Styles from "./Home.less";

export default class Home extends PureComponent {

  render() {
    return (
      <div className={Styles.ContentWrap}>
        <div className={Styles.PageTitle}>欢迎登录,{AppConfig.appName}</div>
      </div>
    );
  }
}
