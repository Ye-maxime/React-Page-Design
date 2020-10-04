import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../store/editor/actions';
import {
  IProject, IElement, EditorActionTypes,
} from '../store/editor/types';
import { RootState } from '../store/index';

// export interface OwnProps {
// }

interface IStateProps {
  projectData: IProject;
  activePageUUID: string;
}

type Props = IStateProps;

const MainPanel: React.FunctionComponent<Props> = ({ projectData, activePageUUID } : Props) => {
  // const [pageElements, setPageElements] = React.useState([]);

  // React.useEffect(() => {
  //   console.log("!!!! useeffect projectData = " + JSON.stringify(projectData));
  // }, []);

  const pageElements = () => {
    const activePage = projectData.pages.find((page) => page.pageId
    === activePageUUID);
    return activePage.elements;
  };

  return (
    <div className="editor-main">
      <div className="editor-pane">
        <div className="editor-pane-inner">
          <div className="editor-main">
            <div className="page-preview-wrapper">
              {pageElements().map((ele) => (ele.value))}
            </div>
            <div className="page-wrapper-mask" />
          </div>
        </div>
      </div>
    </div>
  );
};

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: RootState, ownProps: any): IStateProps => (
  {
    projectData: state.editor.projectData,
    activePageUUID: state.editor.activePageUUID,
  }
);

export default connect<IStateProps, any, any>(mapStateToProps, {})(MainPanel);
