import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Watermark from '@pansy/react-watermark';

export default () => {
  const interval = useRef<NodeJS.Timeout>();
  const [watermarkTexts, setWatermarkTexts] = useState<string[]>(
    ['王某某 6909', moment().format('YYYY-MM-DD HH:mm:ss')]
  );

  useEffect(
    () => {
      // @ts-ignore
      interval.current = setInterval(
        () => {
          setWatermarkTexts((texts) => {
            texts[1] = moment().format('YYYY-MM-DD HH:mm:ss');

            return texts;
          })
        },
        3000
      )

      return () => {
        interval.current && clearInterval(interval.current);
      }
    },
    []
  );

  return (
    <div style={{ width: '100%', height: 800 }}>
      <Watermark text={watermarkTexts} />
    </div>
  )
}
