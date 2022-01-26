import { random } from 'lodash';

// 获取一定范围内的随机整数
export function getRandomIntByRange(lower = 0, upper = 1) {
  return random(lower, upper);
}