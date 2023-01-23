import {useState, memo, useCallback} from 'react';

export default function MemoDemo() {
  const [clickCount, setClickCount] = useState(0);

  const onRender = useCallback(() => {
    console.count('Child component rendered!!!');
  }, []);

  return (
    <>
      <h1>React Memoization</h1>
      <p>A demonstration of `memo`, `useMemo` and `useCallback`</p>
      <div style={{display: 'flex', gap: '8px'}}>
        <button onClick={() => setClickCount((curr) => curr + 1)}>Click</button>
        <h2>Clicks: {clickCount}</h2>
      </div>
      <SlowComponent onRender={onRender} />
    </>
  );
}

// Child Component
const SlowComponent = memo(({onRender}) => {
  onRender();
  return <></>;
});
