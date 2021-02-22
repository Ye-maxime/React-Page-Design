/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
// 中间主编辑页面
import * as React from 'react';
import { connect } from 'react-redux';
import { IProject } from '@store/editor/types';
import { RootState } from '@store/index';
import { renderer } from '@plugins/index';
import EditShape from './EditShape';

// export interface OwnProps {
// }

interface IStateProps {
  projectData: IProject;
  activePageUUID: string;
}

type Props = IStateProps;

const MainPanel: React.FunctionComponent<Props> = ({
  projectData,
  activePageUUID,
}: Props) => {
  const pageElements = () => {
    const activePage = projectData.pages.find(
      (page) => page.pageId === activePageUUID,
    );
    return activePage?.elements || [];
  };

  return (
    <div className="editor-main">
      <div className="editor-pane" id="editor-pane">
        <div id="canvas-panel" className="editor-pane-inner">
          {pageElements().map((eleData) => (
            <EditShape
              key={eleData.elementId}
              commonStyle={eleData.commonStyle}
              elementId={eleData.elementId}
            >
              {renderer(eleData)}
            </EditShape>
          ))}
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

export default connect<IStateProps, any, any>(mapStateToProps, null)(MainPanel);
