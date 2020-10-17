import * as React from 'react';
import { Tabs } from 'antd';
import EditAttributesTab from './EditAttributesTab';

const { TabPane } = Tabs;

function callback(key: string) {
  console.log(key);
}

const AttributesPanel: React.FunctionComponent = () => (
  <div className="el-attr-edit-wrapper">
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="属性" key="1">
        <EditAttributesTab />
      </TabPane>
      <TabPane tab="事件" key="2">
        事件
      </TabPane>
      <TabPane tab="动画" key="3">
        动画
      </TabPane>
    </Tabs>
  </div>
);

export default AttributesPanel;
