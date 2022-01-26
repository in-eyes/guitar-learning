import React from 'react';
import { MenuMap } from '@/common/menu';
import { View } from '@tarojs/components';
import './index.less';

function Title(props) {
  const { title } = props || {};
  return (
    <View className="title">{title}</View>
  );
}

function Menu(props) {
  const { list } = props;
  const onItemClick = (item) => {
    wx.navigateTo({
      url: item.jumpTarget,
    });
  }
  return (
    <View className="menu">
      {list.map(item => {
        return (
          <View
            className="item"
            style={{ backgroundColor: item.bgColor }}
            onClick={() => onItemClick(item)}
          >
            <View className="name">{item.title}</View>
            <View className="desc">{item.desc}</View>
          </View>
        );
      })}
    </View>
  );
}

export default function Home() {
  return (
    <View className="home">
      <Title title="基础" />
      <Menu list={MenuMap['base']} />
      <Title title="和弦" />
      <Menu list={MenuMap['chord']} />
    </View>
  );
}