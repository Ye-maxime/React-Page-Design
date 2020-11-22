import AttrRdpPlaceholder from './AttrRdpPlaceholder';
import AttrRdpText from './AttrRdpText';

const attrRdpComponentsMap = new Map();
attrRdpComponentsMap.set(AttrRdpPlaceholder.name, AttrRdpPlaceholder.component);
attrRdpComponentsMap.set(AttrRdpText.name, AttrRdpText.component);

export default attrRdpComponentsMap;
