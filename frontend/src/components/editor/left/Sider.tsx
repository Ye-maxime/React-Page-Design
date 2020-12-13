import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import axios from 'axios';
import throttle from 'lodash/throttle';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import * as actions from '@store/editor/actions';
import { EditorActionTypes, IPage } from '@store/editor/types';
import { getPageConfig } from '@dataModels/index';

interface IDispatchProps {
  addPage: (newPage: IPage) => EditorActionTypes;
  setActivePageUUID: (pageId: string) => EditorActionTypes;
  addHistoryCache: () => EditorActionTypes;
}

type Props = IDispatchProps;

const Sider: React.FunctionComponent<Props> = ({
  addPage,
  setActivePageUUID,
  addHistoryCache,
}: Props) => {
  const handleClick = (menuInfo: MenuInfo): void => {
    if (menuInfo.key === '1') {
      const newPage: IPage = getPageConfig();
      addPage(newPage);
      setActivePageUUID(newPage.pageId);
      throttle(addHistoryCache, 3000)();

      axios.post('http://localhost:4000/api/pages/add', newPage);
    }
  };

  return (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="vertical"
      theme="light"
      onClick={handleClick}
    >
      <Menu.Item key="1" icon={<AppstoreOutlined />}>
        新建页面
      </Menu.Item>
    </Menu>
  );
};

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  addPage: (newPage) => dispatch(actions.addPage(newPage)),
  setActivePageUUID: (pageId) => dispatch(actions.setActivePageUUID(pageId)),
  addHistoryCache: () => dispatch(actions.addHistoryCache()),
});

export default connect<any, IDispatchProps, any>(
  null,
  mapDispatchToProps,
)(Sider);
