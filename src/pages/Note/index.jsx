import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { NoteMap } from '@/common/notes';
import { Button } from '@/components/Button';
import { getRandomIntByRange } from '@/common/random';
import './index.less';

export default function Note() {
  const [string, setString] = useState(-1);
  const [fret, setFret] = useState(-1);
  const computedFret = () => {
    if (string < 0 || fret < 0) {
      return '-';
    }
    // 空弦音
    if (fret === 0) {
      return `${string} 弦空弦`;
    }
    // 正常情况
    return `${string} 弦 ${fret} 品`;
  };

  const updateFret = () => {
    wx.showLoading({ title: '获取中' });
    setTimeout(() => {
      wx.hideLoading();
    }, 200);
    const string = getRandomIntByRange(1, 6);
    const fret = getRandomIntByRange(0, 12);
    setString(string);
    setFret(fret);
  }

  const showAnswer = () => {
    const ans = String(NoteMap[string][fret]).replace('/', ' / ');
    wx.showModal({
      showCancel: false,
      confirmText: '我知道了',
      title: computedFret(),
      content: `指板音: ${ans}`,
      confirmColor: '#6190e8',
    });
  }

  useEffect(() => {
    updateFret();
  }, []);

  return (
    <View className="note">
      <View className="header">
        <View className="title">请说出指板音</View>
        <View className="content">{computedFret()}</View>
      </View>
      <View className="footer">
        <Button text="随机考考" onClick={updateFret} />
        <View className="btn">
          <Button text="查看答案" theme="minor" onClick={showAnswer} />
        </View>
      </View>
    </View>
  );
}