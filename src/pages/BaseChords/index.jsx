import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { View } from '@tarojs/components';
import { getRandomIntByRange } from '@/common/random';
import { Chord } from '@/common/chord';
import './index.less';

export default function BaseChords() {
  const [chord, setChord] = useState();
  const computedChordName = chord ? chord?.name : '-';

  const updateChords = () => {
    wx.showLoading({ title: '获取中' });
    setTimeout(() => {
      wx.hideLoading();
    }, 200);
    const index = getRandomIntByRange(0, 27);
    const chord = Chord[index];
    setChord(chord);
  }

  const showAnswer = () => {
    wx.showModal({
      showCancel: false,
      confirmText: '我知道了',
      title: chord?.name,
      content: `组成音: ${chord?.notes}`,
      confirmColor: '#6190e8',
    });
  }

  useEffect(() => {
    updateChords();
  }, []);

  return (
    <View className="base-chords">
      <View className="header">
        <View className="title">请说出三和弦组成音</View>
        <View className="content">{computedChordName}</View>
      </View>
      <View className="footer">
        <Button text="随机考考" onClick={updateChords} />
        <View className="btn">
          <Button text="查看答案" theme="minor" onClick={showAnswer} />
        </View>
      </View>
    </View>
  );
}