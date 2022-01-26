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
  const genInterval = async () => {
    const getComputedVal = (xNode) => {
      const { adj, note } = xNode || {};
      let val = note;
      switch (adj) {
        case 0:
          return val;
        case 1:
          if (note === 3) {
            return val + 1;
          }
          if (note === 7) {
            return 1;
          }
          return val + 0.5;
        case -1:
          if (note === 4) {
            return val - 1;
          }
          if (note === 1) {
            return 7;
          }
          return val - 0.5;
      }
    };
    const aNote = {
      adj: getRandomIntByRange(-1, 1),
      note: getRandomIntByRange(1, 7),
    };
    await new Promise((resolve) => setTimeout(resolve, 100));
    const bNote = {
      adj: getRandomIntByRange(-1, 1),
      note: getRandomIntByRange(1, 7),
    };

    console.log('aNote==>', aNote);
    console.log('bNote==>', bNote);
    
    /**
     * 计算出用于比较的值: 约定升号 +0.5, 降号 -0.5
     * 注意:
     * 1) 3-4, 7-1, 经过这两组音, +-0.5 变为 +-1
     * 2) 做加法时对 7 取模, 做减法时遇到 0 变为 7
     */
    // const aComputedVal = getComputedVal(aNote);
    // const bComputedVal = getComputedVal(bNote);

    // console.log('aVal==>', aComputedVal);
    // console.log('bVal==>', bComputedVal);

    // if (aComputedVal > bComputedVal || (aComputedVal === bComputedVal && aNote.note > bNote.note)) {
    //   return [bNote, aNote];
    // }
    return [aNote, bNote];
  }

  // 计算音程关系
  const getIntervalDist = () => {
    if (!interval) {
      return '-';
    }

  }

  const updateInterval = async () => {
    wx.showLoading({ title: '获取中' });
    setTimeout(() => {
      wx.hideLoading();
    }, 200);
    const interval = await genInterval();
    setInterval(interval);
  }

  const showAnswer = () => {
    wx.showModal({
      showCancel: false,
      confirmText: '我知道了',
      title: computedInterval(),
      content: `音程关系: `,
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