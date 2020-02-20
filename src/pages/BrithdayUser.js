/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-19
 * Time: 20:14
 */
import React, {Component} from "react";
import { Tag, Modal, Alert, Button } from "antd";
import storeHelper from "../utils/storeHelper";
import moment from "moment";
// import _ from "lodash";
// import uuidv4 from "uuid/v4";
import TableWrap from "../components/TableWrap";
import PageSearch from "../components/PageSearch";
import Styles from "./BrithdayUser.less";
import CustomForm from "./components/Customer/CustomForm";

export default class BrithdayUser extends Component {
  state={
    data: [],
    customModelShow:false,
    customModelType:"insert",
    curCustom:{},
    tableSelectRowKeys:[]
  };

  componentDidMount() {
    this.fetchData();
  }

  // eslint-disable-next-line no-unused-vars
  UNSAFE_componentWillReceiveProps(nextProps, nextContent) {
    const {show}=nextProps;
    if(show){
      this.fetchData();
    }
  }

  fetchData = () => {
    const storeData = storeHelper.getItem("custom");

    const _data = storeData.filter((o) => {
      if (!o.birthday) {
        return false;
      }
      const curDate = new Date(`${moment().year()}-${o.birthday}`);
      const isValid = moment(curDate, "YYYY-MM-DD").isValid();
      let isBetween = false;

      if (isValid) {
        isBetween = moment(curDate).isBetween(moment(), moment().add(3, "d"));
      }

      return o.birthday && isValid && isBetween;
    });

    this.setState({
      data: _data
    });
  };

  reloadComponent = () => {
    this.fetchData();
  };

  render() {
    const {data,customModelShow,customModelType,curCustom,tableSelectRowKeys}=this.state;

    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width:120,
        render: text => <a>{text}</a>
      },
      {
        title: "生日",
        dataIndex: "birthday",
        key: "birthday"
      },
      {
        title: "备注",
        key: "tags",
        dataIndex: "tags",
        render: tags => (
          <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color}
                key={tag}
            >
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
        )
      },
      {
        title: "操作",
        key: "action",
        width:90,
        // eslint-disable-next-line no-unused-vars
        render: (text, record) => (
          <span>
            <a>编辑</a>
          </span>
        )
      }
    ];

    const searchData=[
      {
        label:"姓名",
        key:"name",
        type:"input"
      }
    ];

    return (
      <div className={Styles.ContentWrap}>
        <Alert message="只显示未来3日，将要过生日的用户"
            showIcon
            type="info"
        />
        <div>
          <TableWrap columns={columns}
              data={data}
              onSelectChange={this.tableSelectOnChange}
              selectedRowKeys={tableSelectRowKeys}
          >
            <div className={Styles.SearchWrap}>
              <PageSearch onReset={this.searchResetHandle}
                  onSubmit={this.searchSubmitHandle}
                  searchData={searchData}
              />
            </div>
            <div className={Styles.OperationWrap}>
              <Button icon="reload"
                  onClick={this.reloadComponent}
                  type="primary"
              />
            </div>
          </TableWrap>
        </div>
        <Modal destroyOnClose
            footer={null}
            mask={false}
            onCancel={()=>this.customModelHandle("",false)}
            title={customModelType==="insert"?"新增用户":"编辑用户"}
            visible={customModelShow}
        >
          <CustomForm curCustom={curCustom}
              onSubmit={this.customModelHandle}
              type={customModelType}
          />
        </Modal>
      </div>
    );
  }
}
