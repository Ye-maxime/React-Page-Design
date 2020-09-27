/* eslint-disable max-len */
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import useDataApi from '../customHooks/useDataApi';
import {
  IProject, IPage, EditorActionTypes,
} from '../store/editor/types';
import * as actions from '../store/editor/actions';
import { RootState } from '../store/index';

// export interface HelloProps extends IStateProps, IDispatchProps {
//   compiler: string; framework: string;
// }

// https://medium.com/knerd/typescript-tips-series-proper-typing-of-react-redux-connected-components-eda058b6727d
// The type for the props provided by the parent component
export interface OwnProps {
  compiler: string; framework: string;
}

// The type for the props provided by mapStateToProps()
interface IStateProps {
  projectData: IProject;
}

// The type for the props provided by mapDispatchToProps()
interface IDispatchProps {
  addPage: (newPage: IPage) => EditorActionTypes;
}

type Props = OwnProps & IStateProps & IDispatchProps;

// interface State {
//   internalComponentStateField: string
// }

// 不能导出该组件 避免在父组件typescript 报错缺少传递某个props
const Hello : React.FunctionComponent<Props> = ({
  compiler, framework, projectData, addPage,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, doFetch } = useDataApi(
    'http://localhost:4000/api/page',
    '',
  );

  const handleAddPage = () => {
    const newPage: IPage = {
      pageId: '2',
      name: 'page2',
      elements: [],
    };
    return addPage(newPage);
  };

  return (
    <>
      <h1>
        Hello from
        {compiler}
        {' '}
        and
        {framework}
        ?
        {data}
        !
      </h1>
      <p>{projectData ? projectData.projectId : 'null'}</p>
      <button type="button" onClick={handleAddPage}>addPage</button>
    </>
  );
};

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: RootState, ownProps: OwnProps): IStateProps => (
  {
    projectData: state.editor.projectData,
  }
);

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  addPage: (newPage) => dispatch(actions.addPage(newPage)),
});

// 需要按顺序写 IStateProps, IDispatchProps, OwnProps
export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Hello);
