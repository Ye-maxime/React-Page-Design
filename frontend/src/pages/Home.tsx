import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IProject, EditorActionTypes } from '../store/editor/types';
import * as actions from '../store/editor/actions';
import { Card } from 'antd';
import { getProjectConfig } from '@dataModels/index';
import history from '../common/browserHistory';
import useDataApi from '../customHooks/useDataApi';
import pagecover from '@assets/images/pagecover.jpg';

const { Meta } = Card;

interface IDispatchProps {
  addProject: (newProject: IProject) => EditorActionTypes;
}

type Props = IDispatchProps;

const Home: React.FunctionComponent<Props> = ({ addProject }: Props) => {
  const { data, doFetch } = useDataApi(
    'http://localhost:4000/api/projects/',
    []
  );

  const createNewProject = () => {
    const newProject = getProjectConfig();
    addProject(newProject);
  };

  const editProject = (projectId: string) => {
    history.push(`/editor/${projectId}`);
  };

  return (
    <div className="home-wrapper">
      <h5>我的作品</h5>
      <div className="home-container">
        <Card
          onClick={createNewProject}
          hoverable
          className="page-item"
          cover={<i className="fas fa-plus page-item-create"></i>}
        >
          <Meta title="新建项目" />
        </Card>
        {Array.isArray(data) &&
          data.map((prj: IProject) => (
            <Card
              key={prj.projectId}
              onClick={() => editProject(prj.projectId)}
              hoverable
              className="page-item"
              cover={<img src={pagecover} className="pagecover" />}
            >
              <Meta title={prj.name} />
            </Card>
          ))}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  addProject: (newProject) => dispatch(actions.addProject(newProject)),
});

// 需要按顺序写 IStateProps, IDispatchProps, OwnProps
export default connect<any, IDispatchProps, any>(
  null,
  mapDispatchToProps
)(Home);
