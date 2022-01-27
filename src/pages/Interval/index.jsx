import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { View } from '@tarojs/components';
import { getRandomIntByRange } from '@/common/random';
import './index.less';

const Adj = {
  '0': '',
  '1': '♯',
  '-1': '♭',
}

export default function Interval() {
  const [interval, setInterval] = useState();

  const computedInterval = () => {
    if (!interval) {
      return '-';
    }
    const [aNote, bNote] = interval || [];
    return `${Adj[String(aNote.adj)]}${aNote.note} - ${Adj[String(bNote.adj)]}${bNote.note}`
  }

  // 标记 -1:降, 0:原, 1:升
  const genInterval = () => {
    const aNote = {
      adj: getRandomIntByRange(-1, 1),
      note: getRandomIntByRange(1, 7),
    };
    const bNote = {
      adj: getRandomIntByRange(-1, 1),
      note: getRandomIntByRange(1, 7),
    };
    return [aNote, bNote];
  }

  // 计算音程关系
  const getIntervalDist = () => {
    // TODO
    return '敬请期待';
  }

  const updateInterval = () => {
    wx.showLoading({ title: '获取中' });
    setTimeout(() => {
      wx.hideLoading();
    }, 200);
    const interval = genInterval();
    setInterval(interval);
  }

  const showAnswer = () => {
    wx.showModal({
      showCancel: false,
      confirmText: '我知道了',
      title: computedInterval(),
      content: getIntervalDist(),
      confirmColor: '#6190e8',
    });
  }

  useEffect(() => {
    updateInterval();
  }, []);

  return (
    <View className="interval">
      <View className="header">
        <View className="title">请说出音程关系(上行)</View>
        <View className="content">{computedInterval()}</View>
      </View>
      <View className="footer">
        <Button text="随机考考" onClick={updateInterval} />
        <View className="btn">
          <Button text="查看答案" theme="minor" onClick={showAnswer} />
        </View>
      </View>
    </View>
  );
}