import React from 'react';
import { Link } from 'react-router-dom';

export interface ProjectLogoProps {
  className?: string;
  logo: string;
  title?: string;
}

interface DefaultProps {
  title: string;
}

class ProjectLogo extends React.PureComponent<ProjectLogoProps, any> {
  static defaultProps: DefaultProps = {
    title: 'Admin Template'
  };

  render() {
    const { logo, title, className } = this.props;

    return (
      <div className={className}>
        <Link to="/">
          <img src={logo} alt="logo" />
          <h1>{title}</h1>
        </Link>
      </div>
    );
  }
}

export default ProjectLogo;
