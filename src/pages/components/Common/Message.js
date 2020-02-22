/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-20
 * Time: 16:21
 */
import React, {PureComponent} from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import PropTypes from "prop-types";
import storeHelper from "../../../utils/storeHelper";
import defaultMessage from "../../../utils/message";
import Styles from "./Message.less";

const ReactGridLayout = WidthProvider(RGL);

export default class Message extends PureComponent {
  state = {
    data: [],
    page:1,
    noMore:false
  };

  componentDidMount() {
    let data =storeHelper.getItem("msg") || [];
    let page =1;

    if(data.length===0){
      data = defaultMessage;
      storeHelper.setItem("msg",data);
    }
    // filter type equals brithday
    data = data.filter((o)=>o.type==="brithday");
    data = _.chunk(data,12)[page-1];

    this.setState({
      data,
      page:page
    });

    const messageBoxWrap=document.getElementById("messageBoxWrap");
    messageBoxWrap.addEventListener("scroll",()=>{
      const scrollTop = messageBoxWrap.scrollTop;
      const maxScroll = messageBoxWrap.scrollHeight - messageBoxWrap.offsetHeight;
      if(scrollTop >= maxScroll){
        // console.log("滚动到底了,加载更多");
        this.loadMore();
        return false;
      }
      if(scrollTop <=0){
        // console.log("滚动到顶了");
        return false;
      }
    });
  }

  loadMore = () => {
    const {data, page:curPage} = this.state;
    const storeData = storeHelper.getItem("msg");
    const _chunk = _.chunk(storeData, 12);
    const totalPage = _chunk.length;

    if (curPage >= totalPage) {
      this.setState({
        noMore:true
      });
      return false;
    }

    let _data = data.concat(_chunk[curPage]);
    this.setState({
      data: _data,
      page: curPage + 1
    });
  };

  render() {
    const {data, noMore}=this.state;
    const {children, onSelected}=this.props;

    const layout = data.map((item,i)=>{
      return {
        x: (i %3),
        y: 0,
        w: 1,
        h: 4,
        maxW:1,
        i: item.id.toString()
      };
    });

    return (
      <div>
        {children}
        <div id="messageBoxWrap"
            style={{ background: "#ECECEC", padding: "8px", height: 400, overflow:"auto"}}
        >
          <ReactGridLayout
              className="layout"
              cols={3}
              isDraggable={false}
              items={data.length}
              layout={layout}
              rowHeight={30}
          >
            {
              data.map((msg)=>(
                <div className={Styles.gridItemWrap}
                    key={msg.id}
                    onClick={()=>onSelected(msg)}
                >
                  {msg.body}
                </div>
              ))
            }
          </ReactGridLayout>
          {
            noMore && (
              <div className={Styles.noMoreTips}>
                共 {data.length} 条
                <br/>
                我也是有底线的...
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

Message.propTypes={
  onSelected:PropTypes.func
};

Message.defaultProps={
  onSelected:()=>{}
};
