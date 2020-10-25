import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../store/index';
import { IProject } from '../../store/editor/types';

interface IStateProps {
  activePageUUID: string;
  projectData: IProject;
}

type Props = IStateProps;

const ControlBar: React.FunctionComponent<Props> = ({
  activePageUUID,
  projectData,
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
          <li className="nav-item text-center active" onClick={savePage}>
            <i className="far fa-save"></i>
            <p>保存</p>
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

export default connect<IStateProps, any, any>(
  mapStateToProps,
  null
)(ControlBar);
