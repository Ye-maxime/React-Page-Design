import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import * as actions from '../store/editor/actions';
import { RootState } from '../store/index';
import { EditorActionTypes } from '../store/editor/types';
import ComponentLibs from '../components/editor/left/ComponentLibs';
import AttributesPanel from '../components/editor/right/AttributesPanel';
import MainPanel from '../components/editor/middle/MainPanel';
import Sider from '../components/editor/left/Sider';
import ControlBar from '../components/editor/middle/ControlBar';

// 路由/editor/:projectId 对应的参数projectId
interface MatchParams {
  projectId: string;
}

export type OwnProps = RouteComponentProps<MatchParams>

interface IStateProps {
  activePageUUID: string;
}

interface IDispatchProps {
  fetchProjectData: (projectId: string) => EditorActionTypes;
}

type Props = OwnProps & IStateProps & IDispatchProps;

const Editor: React.FunctionComponent<Props> = ({
  activePageUUID,
  match,
  fetchProjectData,
}: Props) => {
  React.useEffect(() => {
    fetchProjectData(match.params.projectId);
  }, [match.params.projectId]);

  return (
    <div className="editor-wrapper">
      {/* 最左侧菜单 */}
      {/* <Sider /> */}
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
};

const mapStateToProps = (
  state: RootState,
  ownProps: OwnProps,
): IStateProps => ({
  activePageUUID: state.editor.activePageUUID,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  fetchProjectData: (projectId) => dispatch(actions.fetchProjectData(projectId)),
});

export default connect<IStateProps, IDispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Editor);
