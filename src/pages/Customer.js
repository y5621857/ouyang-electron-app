/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-15
 * Time: 20:09
 */
import React, {PureComponent} from "react";
import { Divider, Tag ,Popconfirm ,Button} from "antd";
import _ from "lodash";
import TableWrap from "../components/TableWrap";
import PageSearch from "../components/PageSearch";
import Styles from "./Customer.less";

export default class Customer extends PureComponent {
  state = {
    data: [
      {
        id: "1",
        key: "1",
        name: "红",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["销售", "财务"]
      },
      {
        id: "2",
        key: "2",
        name: "黄",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["经理"]
      },
      {
        id: "3",
        key: "3",
        name: "蓝",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["客户", "经销商"]
      }
    ]
  };

  deleteCustomHandle = ({id}) => {
    const {data}=this.state;
    const _data = _.cloneDeep(data);

    _.remove(_data,(o)=>{
      return o.id === id;
    });

    this.setState({
      data:_data
    });
  };

  searchSubmitHandle = (searchParams) => {
    console.log(searchParams);
  };

  searchResetHandle = (e) => {
    console.log(e);
  };

  render() {
    const {data}=this.state;

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
            <Popconfirm cancelText="取消"
                okText="确定"
                onConfirm={()=>this.deleteCustomHandle(record)}
                placement="topLeft"
                title="确定删除这个客户吗?"
            >
              <a style={{color:"red"}}>删除</a>
            </Popconfirm>
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
        <div>
          <TableWrap columns={columns}
              data={data}
          >
            <div className={Styles.SearchWrap}>
              <PageSearch onReset={this.searchResetHandle}
                  onSubmit={this.searchSubmitHandle}
                  searchData={searchData}
              />
            </div>
            <div className={Styles.OperationWrap}>
              <Button icon="user-add">添加用户</Button>
            </div>
          </TableWrap>
        </div>
      </div>
    );
  }
}
