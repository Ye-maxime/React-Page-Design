import AttrRdpPlaceholder from './AttrRdpPlaceholder';

const attrRdpComponentsMap = new Map();
attrRdpComponentsMap.set(AttrRdpPlaceholder.name, AttrRdpPlaceholder.component);

export const attrRdpChineseMap = new Map().set(
  AttrRdpPlaceholder.name,
  '占位符'
);

export default attrRdpComponentsMap;
