/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-15
 * Time: 20:09
 */
import React, {PureComponent} from "react";
import { Divider, Tag ,Popconfirm ,Button, Modal} from "antd";
import FileHelper from "../utils/fileHelper";
import storeHelper from "../utils/storeHelper";
import _ from "lodash";
import uuidv4 from "uuid/v4";
import TableWrap from "../components/TableWrap";
import PageSearch from "../components/PageSearch";
import CustomForm from "./components/Customer/CustomForm";
import Styles from "./Customer.less";

// 主进程模块
const path=window.require("path");
const XLSX = window.require("xlsx") ;
const { remote }= window.require("electron");
const {ipcRenderer} = window.require("electron");
const saveLocation=remote.app.getPath("documents");
// import userFile from "../assets/userTableTemplate.xlsx";

export default class Customer extends PureComponent {
  state = {
    customModelShow:false,
    customModelType:"insert",
    curCustom:{},
    data: [],
    tableSelectRowKeys:[]
  };

  componentDidMount() {
    FileHelper.dirCheck(path.join(saveLocation, "ouyangApp")).then(() => {
      console.log("文件夹创建成功");
    });

    const _data= storeHelper.getItem("custom") || [];
    this.setState({
      data:_data
    });
  }

  searchSubmitHandle = (searchParams) => {
    const data= storeHelper.getItem("custom");
    const reg = new RegExp(searchParams.name,"g");

    const result = data.filter((item)=>{
      return reg.test(item.name);
    });

    this.setState({
      data:result
    });
  };

  searchResetHandle = (e) => {
    if(e==="reset"){
      const _data = storeHelper.getItem("custom");
      this.setState({
        data:_data
      });
    }
  };

  customModelHandle = (type="insert",show=false,data={}) => {
    const {data:customList}=this.state;
    const _data=_.cloneDeep(customList);

    if(type==="insert"){
      this.setState({
        customModelType:"insert"
      });

      if(show===false){
        console.log("insert commit",data);
        const _id = uuidv4();
        _data.push({
          id:_id,
          key:_id,
          ...data
        });

        this.setState({
          data:_data
        },()=>{
          storeHelper.setItem("custom",_data);
        });
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
        const storeData = storeHelper.getItem("custom");
        const _storeData = _.cloneDeep(storeData);
        console.log("update commit",data);

        const _curIndex=_.findIndex(_data,(o)=>{
          return o.id===data.id;
        });

        let updateStoreData = _storeData.map((o)=>{
          let _data = o;
          if(o.id===data.id){
            _data = data;
          }
          return _data;
        });

        if(_curIndex!==-1){
          _data[_curIndex]=data;

          this.setState({
            data:_data
          },()=>{
            storeHelper.setItem("custom",updateStoreData);
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

  tableSelectOnChange = (keys) => {
    this.setState({
      tableSelectRowKeys:keys
    });
  };

  tableImportUser = () => {
    const filepaths=remote.dialog.showOpenDialogSync({
      filters: [
        { name: ".xlsx", extensions: ["xlsx"] },
        { name: ".xls", extensions: ["xls"] }
      ],
      properties: ["openFile"],
      message: "选择要导入的Excel文件",
      buttonLabel: "导入"
    });

    // console.log(filepaths);
    if(filepaths&&filepaths[0]){
      const data = storeHelper.getItem("custom");
      // 读取文件
      const workbook = XLSX.readFile(filepaths[0]);
      let xlsxData=[];

      // 遍历每张工作表进行读取（这里默认只读取第一张表）
      for (const sheet in workbook.Sheets) {
        // eslint-disable-next-line no-prototype-builtins
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          // 利用 sheet_to_json 方法将 excel 转成 json 数据
          xlsxData = xlsxData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          // break; // 如果只取第一张表，就取消注释这行
        }
      }

      const _xlsxData = xlsxData.map((item)=>{
        const id = uuidv4();
        let _tags = item["备注"];

        return {
          id:id,
          key:id,
          name:item["姓名"]||"",
          birthday:item["生日"]||"",
          tags:_tags?_tags.split(","):[]
        };
      });

      const _data=[
        ...data,
        ..._xlsxData
      ];

      this.setState({
        data:_data
      },()=>{
        storeHelper.setItem("custom", _data);
      });
    }
  };

  donwloadUserExcel = () => {
    /*FileHelper.writeFile(path.join(saveLocation,"ouyangApp","myfile.js"),"nihao").then(()=>{
      console.log("文件生成成功");
    });*/
    ipcRenderer.send("download",path.join(remote.app.getPath("userData"),"public","userTableTemplate.xlsx"));
  };

  deleteCustomHandle = ({id}) => {
    const {data}=this.state;
    const _data = _.cloneDeep(data);
    const storeData = storeHelper.getItem("custom");
    const _storeData = _.cloneDeep(storeData);

    _.remove(_data,(o)=>{
      return o.id === id;
    });

    _.remove(_storeData,(o)=>{
      return o.id === id;
    });

    this.setState({
      data:_data
    },()=>{
      storeHelper.setItem("custom",_storeData);
    });
  };

  tableBatchDelete = () => {
    const {data,tableSelectRowKeys}=this.state;
    const _data = _.cloneDeep(data);
    const storeData = storeHelper.getItem("custom");
    const _storeData = _.cloneDeep(storeData);

    Modal.confirm({
      title: "提示",
      content: "确定删除选中的用户吗？",
      okText: "确认",
      cancelText: "取消",
      onOk:()=>{
        _.remove(_data,(o)=>{
          return tableSelectRowKeys.includes(o.key);
        });

        _.remove(_storeData,(o)=>{
          return tableSelectRowKeys.includes(o.key);
        });

        this.setState({
          data:_data,
          tableSelectRowKeys:[]
        },()=>{
          storeHelper.setItem("custom",_storeData);
        });
      }
    });
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
              <Button icon="user-add"
                  onClick={()=>this.customModelHandle("insert",true)}
                  type="primary"
              >添加用户</Button>
              <Button icon="user-add"
                  onClick={()=>this.tableImportUser()}
                  style={{marginLeft:8}}
                  type="primary"
              >导入用户</Button>
              <Button icon="user-add"
                  onClick={this.donwloadUserExcel}
                  style={{marginLeft:8}}
                  type="primary"
              >下载导入模板</Button>
              <Button disabled={tableSelectRowKeys.length===0}
                  icon="user-add"
                  onClick={this.tableBatchDelete}
                  style={{marginLeft:8}}
                  type="danger"
              >批量删除</Button>
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
