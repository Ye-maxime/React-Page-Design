/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import * as actions from '@store/editor/actions';
import { RootState } from '@store/index';
import { EditorActionTypes, IProject } from '@store/editor/types';
import { canUndo, canRedo } from '@selectors/index';
import { dataURItoBlob } from '@common/utils';
import logo from '@assets/images/logo.png';

interface IStateProps {
  projectData: IProject;
  canUndo: boolean;
  canRedo: boolean;
}

interface IDispatchProps {
  undo: () => EditorActionTypes;
  redo: () => EditorActionTypes;
}

type Props = IStateProps & IDispatchProps;

const ControlBar: React.FunctionComponent<Props> = ({
  projectData,
  canUndo,
  canRedo,
  undo,
  redo,
}: Props) => {
  const saveProject = async () => {
    const coverImage = await screenshots();
    const updatedProjectData = {
      ...projectData,
      coverImage,
    };
    axios.post(
      `http://localhost:4000/api/projects/update/${projectData.projectId}`,
      updatedProjectData, // 不需要JSON.stringify 默认已经是application/json形式
    );

    // fetch(`http://localhost:4000/api/projects/add`, {
    //   method: 'post',
    //   body: JSON.stringify(projectData),
    // });
  };

  const undoPage = () => {
    undo();
  };

  const redoPage = () => {
    redo();
  };

  const screenshots = async () => {
    const el: HTMLElement = document.querySelector('#canvas-panel');
    // 将指定Html内容写入到Canvas
    const canvas = await html2canvas(el, {
      backgroundColor: '#000',
    });
    // 将Canvas转换成 base64 形式，用于提交到后台
    const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
    const blob = dataURItoBlob(dataUrl);
    const imageFile = new File([blob], `${+new Date()}.png`, { type: 'image/png' });
    const params = new FormData();
    params.append('file', imageFile);
    const res = await axios.post(
      'http://localhost:4000/api/common/uploadFile',
      params,
    );
    return res.data ? res.data : '';
  };

  console.log('render ControlBar!!!');
  // todo src路径优化
  return (
    <nav className="navbar navbar-expand-lg navbar-light control-bar">
      <Link to="/" className="navbar-brand">
        <img
          src={`http://localhost:8081/${logo}`}
          alt="page design logo"
          width="150"
          height="70"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active" onClick={saveProject}>
            <i className="far fa-save" />
            <p className="nav-item-text">保存</p>
          </li>
          <li
            className={`nav-item${canUndo ? ' ' : ' disabled'}`}
            onClick={undoPage}
          >
            <i className="fas fa-undo" />
            <p className="nav-item-text">撤销</p>
          </li>
          <li
            className={`nav-item${canRedo ? ' ' : ' disabled'}`}
            onClick={redoPage}
          >
            <i className="fas fa-redo" />
            <p className="nav-item-text">重做</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: RootState, ownProps: any): IStateProps => ({
  projectData: state.editor.projectData,
  canUndo: canUndo(state.editor),
  canRedo: canRedo(state.editor),
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  undo: () => dispatch(actions.undo()),
  redo: () => dispatch(actions.redo()),
});

export default connect<IStateProps, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(ControlBar);
