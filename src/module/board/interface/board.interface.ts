/* eslint-disable prettier/prettier */
export interface Board {
  id: string;
  title: string;
  personal: number;
  category: string;
  tag: string;
  contents: string;
  price: number;
}

export class BoardModel implements Board {
  id: string;
  title: string;
  personal: number;
  category: string;
  tag: string;
  contents: string;
  price: number;
  // 추가적으로 다른 프로퍼티가 있을 경우도 구현해야 함...
}