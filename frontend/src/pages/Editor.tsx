import * as React from 'react';
import { connect } from 'react-redux';
import {
  IProject, IPage, EditorActionTypes,
} from '../store/editor/types';
import ComponentLibs from '../components/ComponentLibs';

interface ISideBarMenus {
  label: string;
  value: string;
  elementUiIcon: string;
}

interface IStateProps {
  projectData: IProject;
  activePageUUID: string;
  activeElementUUID: string;
}

interface State {
  id: string; // 当前页面id
  loading: boolean;
  showPreview: boolean;
  activeAttr: string;
  sidebarMenus: ISideBarMenus[];
}

type Props = IStateProps & State;

// const Editor : React.FunctionComponent<Props> = ({
//   projectData, activePageUUID, activeElementUUID, id,
//   loading, showPreview, activeAttr, sidebarMenus,
// }: Props) => (
const Editor : React.FunctionComponent = () => (
  <div className="page-editor editor-wrapper">
    {/* 左侧导航 */}
    <div className="editor-side-bar border-R">
      <ComponentLibs />
    </div>

    {/* 页面编辑区域 */}
    <div className="editor-main">
      <div className="control-bar-wrapper" />
    </div>

    {/* 属性编辑区域 */}
    <div className="el-attr-edit-wrapper scrollbar-wrapper" />
  </div>
);

export default Editor;
