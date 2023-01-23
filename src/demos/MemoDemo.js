import {useState} from 'react';

export default function MemoDemo() {
  const [clickCount, setClickCount] = useState(0);

  const coords = {
    x: 100,
    y: 200,
  };

  const onRender = () => {
    console.count('Child component rendered!!!');
  };

  return (
    <>
      <h1>React Memoization</h1>
      <p>A demonstration of `memo`, `useMemo` and `useCallback`</p>
      <div style={{display: 'flex', gap: '8px'}}>
        <button onClick={() => setClickCount((curr) => curr + 1)}>Click</button>
        <h2>Clicks: {clickCount}</h2>
      </div>
      <SlowComponent onRender={onRender} coords={coords} />
    </>
  );
}

// Child Component
const SlowComponent = ({onRender, coords}) => {
  onRender();
  return (
    <p>X: {coords.x}, Y: {coords.y}</p>
  );
};
