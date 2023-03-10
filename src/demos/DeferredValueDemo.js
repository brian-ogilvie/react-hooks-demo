import {useState, useDeferredValue, memo} from 'react';
import wait from '../utils/wait';

export default function DeferredValueDemo() {
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <h1>Deferring a Value</h1>
      <p>A demonstration of `useDeferredValue`</p>
      <label htmlFor="name">
        Name: 
        <input
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={({target}) => setName(target.value)}
        />
      </label>
      <div>Your name is {name || 'unknown'}.</div>
      <hr />
      <label htmlFor="query">
        Search Query: 
        <input
          id="query"
          placeholder="Enter a query"
          value={query}
          onChange={({target}) => setQuery(target.value)}
        />
      </label>
      <div style={{opacity: query !== deferredQuery ? 0.5 : 1}}>
        <SlowComponent query={deferredQuery} />
      </div>
    </>
  );
}

// Child Component
const SlowComponent = memo(({query}) => {
  wait(0.5);
  return ( 
    <>
      <div>Your query is: {query || 'not set'}</div>
      {query && (
        <div style={{color: 'red', fontSize: '2rem'}}>AWESOME DATA VIZ!!!</div>
      )}
    </>
  );
});
