import React from 'react';
import { shallow } from 'enzyme';
import SendCode from '../index';

describe('Component SendCode', () => {
  describe('without props', () => {
    const component = shallow(<SendCode />);

    it('should match a snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });
});
