/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-21
 * Time: 10:32
 */
import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default class UEditor extends PureComponent {
  state = {
    ueditor: null
  };

  componentDidMount() {
    const UE = window.UE;
    const {id}=this.props;
    if (id) {
      try {
        /* 加载之前先执行删除操作，否则如果存在页面切换，
           再切回带编辑器页面重新加载时不刷新无法渲染出编辑器 */
        UE.delEditor(id);
      } catch (e) {
        console.log(e);
      }

      let ueditor = UE.getEditor(id, {
        toolbars: [
          ["bold", "italic", "underline"]
        ],
        initialContent: "",
        autoHeightEnabled: false,
        autoFloatEnabled: false,
        elementPathEnabled: false,
        wordCount: false,
        enableAutoSave: false,
        initialFrameWidth: this.props.width,
        initialFrameHeight: this.props.height
      });

      this.setState({
        ueditor
      });
    }
  }

  render() {
    const {id, height}=this.props;

    return (
      <div id={id}
          style={{height:height}}
      />
    );
  }
}

UEditor.defaultProps={
  id:"ueditor",
  height:300
};

UEditor.propTypes={
  id:PropTypes.string,
  height:PropTypes.number
};
