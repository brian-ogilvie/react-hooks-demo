import Pages from '../Pages';

const activeStyle = {
  backgroundColor: 'skyblue',
  borderColor: 'black',
};

export default function DemoSlector({demo, setDemo}) {
  return (
    <nav style={{display: 'flex', gap: '8px'}}>
      <Button
        label="Memoization"
        isActive={demo === Pages.Memo}
        onClick={() => setDemo(Pages.Memo)}
      />
      <Button
        label="Deferred Value"
        isActive={demo === Pages.Deferred}
        onClick={() => setDemo(Pages.Deferred)}
      />
    </nav>
  );
}

function Button({label, onClick, isActive}) {
  return (
    <button onClick={onClick} style={isActive ? activeStyle : {}}>
      {label}
    </button>
  );
}
