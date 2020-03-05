import React, { FC } from 'react';
import { Link, formatMessage } from 'umi';
import Exception from '@/components/exception';

const Exception404: FC = () => (
  <Exception
    type="404"
    linkElement={Link}
    desc={formatMessage({ id: 'app.exception.description.404' })}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Exception404;
