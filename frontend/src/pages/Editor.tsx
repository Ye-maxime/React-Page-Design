import * as React from 'react';
import { connect } from 'react-redux';
import {
  IProject, IPage, EditorActionTypes,
} from '../store/editor/types';
import ComponentLibs from '../components/left/ComponentLibs';
import AttributesPanel from '../components/right/AttributesPanel';
import MainPanel from '../components/middle/MainPanel';

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
    <ComponentLibs />

    {/* 页面编辑区域 */}
    <MainPanel />

    {/* 属性编辑区域 */}
    <AttributesPanel />
  </div>
);

export default Editor;
