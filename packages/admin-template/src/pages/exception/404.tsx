import React from 'react';
import { Link } from 'umi';
import { formatMessage } from 'umi';
import Exception from '@/components/exception';

const Exception404: React.FC = () => (
  <Exception
    type="404"
    linkElement={Link}
    desc={formatMessage({ id: 'app.exception.description.404' })}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Exception404;
