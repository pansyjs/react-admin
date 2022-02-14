import React, { useState } from 'react';
import moment from 'moment';
import { useInterval } from '@pansy/react-hooks'
import Watermark from '@pansy/react-watermark';

export default () => {
  const [watermarkTexts, setWatermarkTexts] = useState<string[]>(
    ['王某某 6909', moment().format('YYYY-MM-DD HH:mm:ss')]
  );

  useInterval(() => {
    setWatermarkTexts((texts) => {
      texts[1] = moment().format('YYYY-MM-DD HH:mm:ss');

      return texts;
    })
  }, 3 * 1000);

  return (
    <Watermark width={200} height={200} text={watermarkTexts}>
      <div style={{ width: '100%', height: 800 }} />
    </Watermark>
  )
}
