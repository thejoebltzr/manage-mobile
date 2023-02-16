import React from 'react';
import {Dropdown as RNEDropdown} from 'react-native-element-dropdown';
import {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

const Dropdown = (args: DropdownProps) => {
  return <RNEDropdown {...args} />;
};

export default Dropdown;
