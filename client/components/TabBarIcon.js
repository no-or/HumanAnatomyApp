import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={props.style}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      onPress={props.onPress}
    />
  );
}
