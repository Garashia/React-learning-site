# Lesson 8: パフォーマンス最適化（memo/useMemo/useCallback）

再レンダリングの抑制・高コスト計算のメモ化・関数参照の安定化を体験します。

学習ポイント:
- `React.memo` で子の再レンダリングを削減
- `useMemo` で高コスト計算の結果をキャッシュ
- `useCallback` で props 関数の参照を安定化

## スニペットA: useMemo
```jsx
const filtered = React.useMemo(() => items.filter(x => x.includes(q)), [items, q]);
```

## スニペットB: React.memo
```jsx
const Row = React.memo(function Row({ value }){ return <li>{value}</li>; });
```

やってみよう:
1. 計算時間を伸ばして効果を体感（busy-loopなど）
2. `onChange` を `useCallback` しない場合との比較
3. `key` をわざと不安定にして挙動を観察


