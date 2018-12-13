import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Divider, Tag, Input, Icon, Spin, Avatar } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import { currentUserType, tagType } from '@/types/user';
import { PureComponent } from '@/components/BaseComponent';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Layout.less';

export interface CenterLayoutProps {
  currentUserLoading: boolean;
  currentUser: currentUserType;
  listLoading: boolean;
  projectLoading: boolean;
  notice: any;
}

interface State {
  readonly newTags: tagType[];
  readonly inputVisible: boolean;
  readonly inputValue: string;
}

@connect(({ loading, user, project }) => ({
  currentUser: user.currentUser,
  notice: project.notice,
  listLoading: loading.effects['list/fetch'],
  currentUserLoading: loading.effects['user/fetchCurrent'],
  projectLoading: loading.effects['project/fetchGetNotice']
}))
class CenterLayout extends PureComponent<CenterLayoutProps, State> {
  private input: any;
  readonly state: State = {
    newTags: [],
    inputVisible: false,
    inputValue: ''
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent'
    });
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8
      }
    });
    dispatch({
      type: 'project/fetchGetNotice'
    });
  }

  onTabChange = (key) => {
    const { match } = this.props;
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
      case 'applications':
        router.push(`${match.url}/applications`);
        break;
      case 'projects':
        router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (
      inputValue &&
      newTags.filter((tag) => tag.label === inputValue).length === 0
    ) {
      newTags = [
        ...newTags,
        { key: `new-${newTags.length}`, label: inputValue }
      ];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: ''
    });
  };

  render() {
    const {
      listLoading,
      projectLoading,
      currentUserLoading,
      currentUser,
      notice,
      match,
      children
    } = this.props;
    const { newTags, inputVisible, inputValue } = this.state;
    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            文章 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        )
      },
      {
        key: 'applications',
        tab: (
          <span>
            应用 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        )
      },
      {
        key: 'projects',
        tab: (
          <span>
            项目 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        )
      }
    ];

    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              bordered={false}
              style={{ marginBottom: 24 }}
              loading={currentUserLoading}
            >
              {currentUser && Object.keys(currentUser).length ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{currentUser.name}</div>
                    <div>{currentUser.signature}</div>
                  </div>
                  <div className={styles.detail}>
                    <p>
                      <i className={styles.title} />
                      {currentUser.title}
                    </p>
                    <p>
                      <i className={styles.group} />
                      {currentUser.group}
                    </p>
                  </div>
                  <Divider dashed />
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>标签</div>
                    {currentUser.tags.concat(newTags).map((item) => (
                      <Tag key={item.key}>{item.label}</Tag>
                    ))}
                    {inputVisible && (
                      <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                      >
                        <Icon type="plus" />
                      </Tag>
                    )}
                  </div>
                  <Divider style={{ marginTop: 16 }} dashed />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>团队</div>
                    <Spin spinning={projectLoading}>
                      <Row gutter={36}>
                        {notice.map((item) => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </Spin>
                  </div>
                </div>
              ) : (
                'loading...'
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
              loading={listLoading}
            >
              {children}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default CenterLayout;
