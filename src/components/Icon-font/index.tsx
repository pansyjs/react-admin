import { Icon } from 'antd';
import { SETTING_DEFAULT_CONFIG } from '@/config';

const { iconFontUrl } = SETTING_DEFAULT_CONFIG;

export const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconFontUrl
});
