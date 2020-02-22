/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-19
 * Time: 20:14
 */
import React, {Component, Fragment} from "react";
import { Tag, Modal, Alert, Button, Divider, Icon } from "antd";
import storeHelper from "../utils/storeHelper";
import {flattenArr, objToArr} from "../utils/helper";
import moment from "moment";
// import _ from "lodash";
import TableWrap from "../components/TableWrap";
import PageSearch from "../components/PageSearch";
import Styles from "./BrithdayUser.less";
import Message from "./components/Common/Message";
import MsgTeplate from "./components/Common/MsgTeplate";
import MsgComplete from "./components/Common/MsgComplete";
import MsgTemplateForm from "./components/BrithdayUser/MsgTemplateForm";
import uuidv4 from "uuid/v4";

export default class BrithdayUser extends Component {
  state={
    data: [],
    messageModelShow:false,
    msgTemplateModelShow:false,
    templateModelOperationShow:false,
    msgCompleteModelShow:false,
    msgTemplateTpye:"insert",
    curMsgTemplate:{},
    curCustom:{},
    curMsg:{},
    curCompleteMsg:"",
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

  sendMessage = (record) => {
    this.setState({
      curCustom:record
    },()=>{
      this.messageModelHandle(true);
    });
  };

  messageModelHandle = (show=false) => {
    this.setState({
      messageModelShow:show
    });
  };

  onSelectedMessage = (msg) => {
    Modal.confirm({
      content:"确定使用这条祝福语吗？",
      icon:<Icon type="question-circle" />,
      centered:true,
      onOk:()=>{
        this.setState({
          curMsg:msg
        },()=>{
          this.messageModelHandle(false);
          this.msgTemplateModelHandle(true);
        });
      }
    });
  };

  msgTemplateModelHandle = (show=false) => {
    this.setState({
      msgTemplateModelShow:show
    });
  };

  templateModelOperationShow = (show=false,type="insert",data={}) => {
    this.setState({
      templateModelOperationShow: show,
      msgTemplateTpye:type,
      curMsgTemplate:data,
      curCompleteMsg:""
    });
  };

  templateModelOperationSubmit = (type,params) => {
    console.log(type,params);
    if(type==="insert"){
      let data = storeHelper.getItem("msgTemplate") || [];
      const id = uuidv4();
      data.push({
        id,
        key:id,
        ...params
      });

      storeHelper.setItem("msgTemplate",data);

      this.setState({
        templateModelOperationShow:false
      },()=>{
        this.MsgTeplate.updateComponent();
      });
    }

    if(type==="update" && params.id){
      const data = storeHelper.getItem("msgTemplate") || [];
      let _data = flattenArr(data);
      _data[params.id] = params;
      _data = objToArr(_data);
      storeHelper.setItem("msgTemplate",_data);
      this.MsgTeplate.updateComponent();
      this.templateModelOperationShow(false);
    }
  };

  msgCompleteModelShowHandle = (show=false) => {
    this.setState({
      msgCompleteModelShow:show
    },()=>{
      if(!show){
        this.setState({
          curCompleteMsg:""
        });
      }
    });
  };

  renderSentiment = (template = {}) => {
    const {html} = template;

    if (html) {
      const {curCustom, curMsg} = this.state;
      let curCompleteMsg = html.replace(/\$NAME\$/g, curCustom.name).replace(/\$CONTENT\$/g, curMsg.body);

      this.setState({
        curCompleteMsg
      }, () => {
        this.setState({
          msgCompleteModelShow:true
        });
      });
    }
  };

  render() {
    const {
      data,
      messageModelShow,
      msgTemplateModelShow,
      templateModelOperationShow,
      msgCompleteModelShow,
      msgTemplateTpye,
      curMsgTemplate,
      curMsg,
      curCompleteMsg,
      tableSelectRowKeys
    }=this.state;

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
        width:160,
        render: (text, record) => (
          <Fragment>
            <span onClick={()=>this.sendMessage(record)}>
              <a>祝福语模板</a>
            </span>
            <Divider type="vertical"/>
            <span onClick={()=>this.sendMessage(record)}>
              <a>直接发送</a>
            </span>
          </Fragment>
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
              <Button icon="project"
                  onClick={()=>this.msgTemplateModelHandle(true)}
                  style={{marginLeft:8}}
                  type="primary"
              >短信模板</Button>
            </div>
          </TableWrap>
        </div>
        <Modal destroyOnClose
            footer={null}
            mask={false}
            onCancel={()=>this.messageModelHandle(false)}
            title="祝福语"
            visible={messageModelShow}
            width="80%"
        >
          <Message onSelected={this.onSelectedMessage}>
            <div style={{marginBottom:8}}>
              <Alert message="选中想要的祝福语，生成祝福短信"
                  showIcon
                  type="info"
              />
            </div>
          </Message>
        </Modal>
        <Modal destroyOnClose
            footer={null}
            mask={false}
            onCancel={()=>this.msgTemplateModelHandle(false)}
            title="短信模板"
            visible={msgTemplateModelShow}
            width="80%"
        >
          <MsgTeplate hasSentiment={Object.keys(curMsg).length!==0}
              onEditer={this.templateModelOperationShow}
              onSubmit={this.renderSentiment}
              ref={(child) => { this.MsgTeplate = child; }}
          >
            <div style={{marginBottom:8}}>
              <Button onClick={()=>this.templateModelOperationShow(true)}
                  type="primary"
              >添加模板</Button>
            </div>
            <Alert message="点击短信模板即可使用"
                style={{marginBottom:8}}
                type="info"
            />
          </MsgTeplate>
        </Modal>
        <Modal destroyOnClose
            footer={null}
            mask={false}
            onCancel={()=>this.templateModelOperationShow(false)}
            title="编辑短信模板"
            visible={templateModelOperationShow}
            width="50%"
        >
          <MsgTemplateForm curMsg={curMsgTemplate}
              onSubmit={this.templateModelOperationSubmit}
              type={msgTemplateTpye}
          />
        </Modal>
        <Modal destroyOnClose
            footer={null}
            mask={false}
            onCancel={()=>this.msgCompleteModelShowHandle(false)}
            title="祝福短信"
            visible={msgCompleteModelShow}
            width="50%"
        >
          <MsgComplete
              msg={curCompleteMsg}
          />
        </Modal>
      </div>
    );
  }
}
