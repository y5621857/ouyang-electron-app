/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-15
 * Time: 20:09
 */
import React, {PureComponent} from "react";
import { Table, Divider, Tag } from "antd";
import Styles from "./Customer.less";

export default class Customer extends PureComponent {

  render() {
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width:90,
        render: text => <a>{text}</a>
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        width:60
      },
      {
        title: "生日",
        dataIndex: "address",
        key: "address"
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
            <Divider type="vertical" />
            <a>删除</a>
          </span>
        )
      }
    ];

    const data = [
      {
        key: "1",
        name: "红",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["销售", "财务"]
      },
      {
        key: "2",
        name: "黄",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["经理"]
      },
      {
        key: "3",
        name: "蓝",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["客户", "经销商"]
      }
    ];

    return (
      <div className={Styles.ContentWrap}>
        <div>
          <Table bordered
              columns={columns}
              dataSource={data}
              size="small"
          />
        </div>
      </div>
    );
  }
}
