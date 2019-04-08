import { Icon } from 'antd';
import { SETTING_DEFAULT_CONFIG } from '@/config';

const { iconFontUrl } = SETTING_DEFAULT_CONFIG;

// 使用：
// import IconFont from '@/components/icon-font';
// <IconFont type='icon-demo' className='xxx-xxx' />
export default Icon.createFromIconfontCN({
  scriptUrl: iconFontUrl
});
