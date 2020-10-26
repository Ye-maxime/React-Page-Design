/* eslint-disable max-len */
// 中间主编辑页面
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../../store/editor/actions';
import { IProject, EditorActionTypes } from '../../store/editor/types';
import { RootState } from '../../store/index';
import { renderer } from '../../plugins/index';

// export interface OwnProps {
// }

interface IStateProps {
  projectData: IProject;
  activePageUUID: string;
}

interface IDispatchProps {
  setActiveElementUUID: (elementId: string) => EditorActionTypes;
}

type Props = IStateProps & IDispatchProps;

const MainPanel: React.FunctionComponent<Props> = ({
  projectData,
  activePageUUID,
  setActiveElementUUID,
}: Props) => {
  const pageElements = () => {
    const activePage = projectData.pages.find(
      (page) => page.pageId === activePageUUID
    );
    return activePage?.elements || [];
  };

  return (
    <div className="editor-main">
      <div className="editor-pane">
        <div className="editor-pane-inner">
          {pageElements().map((eleData) =>
            renderer(eleData, setActiveElementUUID)
          )}
        </div>
      </div>
    </div>
  );
};

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: RootState, ownProps: any): IStateProps => ({
  projectData: state.editor.projectData,
  activePageUUID: state.editor.activePageUUID,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  setActiveElementUUID: (elementId) =>
    dispatch(actions.setActiveElementUUID(elementId)),
});

export default connect<IStateProps, IDispatchProps, any>(
  mapStateToProps,
  mapDispatchToProps
)(MainPanel);
