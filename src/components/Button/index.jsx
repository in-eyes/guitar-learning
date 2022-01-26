import React from 'react';
import { View } from '@tarojs/components';
import './index.less';

export function Button(props) {
  const { text, theme = 'major', onClick = () => {} } = props || {};
  return (
    <View className={`button ${theme}`} onClick={onClick}>{text}</View>
  );
}