/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-15
 * Time: 20:09
 */
import React, {PureComponent} from "react";
import { Divider, Tag ,Popconfirm ,Button, Modal} from "antd";
import _ from "lodash";
import TableWrap from "../components/TableWrap";
import PageSearch from "../components/PageSearch";
import CustomForm from "./components/Customer/CustomForm";
import Styles from "./Customer.less";

export default class Customer extends PureComponent {
  state = {
    customModelShow:false,
    customModelType:"insert",
    curCustom:{},
    data: [
      {
        id: "1",
        key: "1",
        name: "红",
        age: 32,
        birthday: "1987-09-12",
        mounthDay:"09-12",
        tags: ["销售", "财务"]
      },
      {
        id: "2",
        key: "2",
        name: "黄",
        age: 42,
        birthday: "1987-09-13",
        mounthDay:"09-13",
        tags: ["经理"]
      },
      {
        id: "3",
        key: "3",
        name: "蓝",
        age: 32,
        birthday: "1987-09-14",
        mounthDay:"09-14",
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

  customModelHandle = (type="insert",show=false,data={}) => {
    const {data:customList}=this.state;

    if(type==="insert"){
      this.setState({
        customModelType:"insert"
      });

      if(show===false){
        console.log("insert commit",data);
      }
    }

    if(type==="update"){
      this.setState({
        customModelType:"update"
      });

      if(show===true){
        console.log("update init",data);
        this.setState({
          curCustom:data
        });
      }

      if(show===false&& data && data.id){
        console.log("update commit",data);
        const _data=_.cloneDeep(customList);

        const _curIndex=_.findIndex(_data,(o)=>{
          return o.id===data.id;
        });

        if(_curIndex!==-1){
          console.log(data);
          _data[_curIndex]=data;
          console.log(_data);

          this.setState({
            data:_data
          });
        }
      }
    }

    if(!type || show===false){
      this.setState({
        customModelType:"insert",
        customModelShow:false,
        curCustom:{}
      });

      return;
    }

    this.setState({
      customModelShow:show
    });
  };

  render() {
    const {data,customModelShow,customModelType,curCustom}=this.state;

    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width:120,
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
        dataIndex: "birthday",
        key: "birthday"
      },
      {
        title: "月份",
        dataIndex: "mounthDay",
        key: "mounthDay"
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
            <a onClick={()=>this.customModelHandle("update",true,record)}>编辑</a>
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
              <Button icon="user-add"
                  onClick={()=>this.customModelHandle("insert",true)}
                  type="primary"
              >添加用户</Button>
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
