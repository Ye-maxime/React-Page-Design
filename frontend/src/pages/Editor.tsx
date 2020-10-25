import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/index';
import { IProject, IPage, EditorActionTypes } from '../store/editor/types';
import ComponentLibs from '../components/left/ComponentLibs';
import AttributesPanel from '../components/right/AttributesPanel';
import MainPanel from '../components/middle/MainPanel';
import Sider from '../components/left/Sider';
import ControlBar from '../components/middle/ControlBar';

// interface ISideBarMenus {
//   label: string;
//   value: string;
//   elementUiIcon: string;
// }

interface IStateProps {
  //   projectData: IProject;
  activePageUUID: string;
  //   activeElementUUID: string;
}

// interface State {
//   id: string; // 当前页面id
//   loading: boolean;
//   showPreview: boolean;
//   activeAttr: string;
//   sidebarMenus: ISideBarMenus[];
// }

type Props = IStateProps;

const Editor: React.FunctionComponent<Props> = ({ activePageUUID }: Props) => (
  <div className="page-editor editor-wrapper">
    {/* 最左侧菜单 */}
    <Sider />

    {activePageUUID && (
      <div className="container editor-container">
        <div className="row">
          {/* 中间上方按钮栏 */}
          <ControlBar />
        </div>
        <div className="row">
          {/* 左侧导航 */}
          <ComponentLibs />
          {/* 页面编辑区域 */}
          <MainPanel />
          {/* 属性编辑区域 */}
          <AttributesPanel />
        </div>
      </div>
    )}
  </div>
);

const mapStateToProps = (state: RootState, ownProps: any): IStateProps => ({
  activePageUUID: state.editor.activePageUUID,
});

export default connect<IStateProps, any, any>(mapStateToProps, null)(Editor);
