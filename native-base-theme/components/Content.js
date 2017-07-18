import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';

export default (variables = variable) => {
  const contentTheme = {
      '.padder': {
        padding: variables.contentPadding,
      },
      flex: 1,
      backgroundColor: '#ececec',
      'NativeBase.Segment': {
        borderWidth: 0,
        backgroundColor: 'transparent'
      }
  };

  return contentTheme;
};
