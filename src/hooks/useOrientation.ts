import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import {IS_PORTRAIT} from '../theme/responsive';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>(
    IS_PORTRAIT ? 'PORTRAIT' : 'LANDSCAPE',
  );

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
  }, []);

  return orientation;
};
