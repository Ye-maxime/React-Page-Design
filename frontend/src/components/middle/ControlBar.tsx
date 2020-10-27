import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Dispatch } from 'redux';
import * as actions from '../../store/editor/actions';
import { RootState } from '../../store/index';
import { EditorActionTypes, IProject } from '../../store/editor/types';

interface IStateProps {
  activePageUUID: string;
  projectData: IProject;
}

interface IDispatchProps {
  undo: () => EditorActionTypes;
  redo: () => EditorActionTypes;
}

type Props = IStateProps & IDispatchProps;

const ControlBar: React.FunctionComponent<Props> = ({
  activePageUUID,
  projectData,
  undo,
  redo,
}: Props) => {
  const savePage = () => {
    const pageData = projectData.pages.find((p) => p.pageId === activePageUUID);
    axios.post(
      `http://localhost:4000/api/pages/update/${activePageUUID}`,
      JSON.stringify(pageData),
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  };

  const undoPage = () => {
    undo();
  };

  const redoPage = () => {
    redo();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light control-bar">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active" onClick={savePage}>
            <i className="far fa-save"></i>
            <p className="nav-item-text">保存</p>
          </li>
          <li className="nav-item" onClick={undoPage}>
            <i className="fas fa-undo"></i>
            <p className="nav-item-text">撤销</p>
          </li>
          <li className="nav-item" onClick={redoPage}>
            <i className="fas fa-redo"></i>
            <p className="nav-item-text">重做</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: RootState, ownProps: any): IStateProps => ({
  activePageUUID: state.editor.activePageUUID,
  projectData: state.editor.projectData,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  undo: () => dispatch(actions.undo()),
  redo: () => dispatch(actions.redo()),
});

export default connect<IStateProps, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(ControlBar);
