import React from 'react';
import {useState} from 'react';
import 'milligram';
import DeferredValueDemo from '../demos/DeferredValueDemo';
import DemoSlector from './DemoSelector';
import MemoDemo from '../demos/MemoDemo';
import Pages from '../Pages';

export default function App() {
  const [demo, setDemo] = useState(Pages.Memo);

  return (
    <>
      <DemoSlector demo={demo} setDemo={setDemo} />
      <hr />
      {demo === Pages.Memo && <MemoDemo />}
      {demo === Pages.Deferred && <DeferredValueDemo />}
    </>
  );
}
