import { h, render } from 'preact';
import Main from './components/Main/main';

function App() {
  return (
    <div>
      <Main /> 
    </div>
  );
}

const root = document.querySelector("#root");

render(<App />, root);