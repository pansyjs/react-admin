import React, { FC } from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getLocale, setLocale } from 'umi';
import { ClickParam } from 'antd/es/menu';
import classNames from 'classnames';
import HeaderDropdown from '@/components/header-dropdown';
import styles from './index.less';

interface SelectLangProps {
  className?: string;
}

const locales = {
  'zh-CN': {
    label: '简体中文',
    icon: '🇨🇳'
  },
  'en-US': {
    label: 'English',
    icon: '🇺🇸'
  }
}

const SelectLang: FC<SelectLangProps> = (props) => {
  const { className } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }: ClickParam): void => setLocale(key);
  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      {Object.keys(locales).map((locale) => {
        const localeInfo = locales[locale];

        return (
          <Menu.Item key={locale}>
            <span role="img" aria-label={localeInfo.label}>
              {localeInfo.icon}
            </span>{' '}
            {localeInfo.label}
          </Menu.Item>
        )
      })}
    </Menu>
  );

  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <GlobalOutlined title="语言" />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
