import { h, render } from 'preact';
import Header from './components/Header/header';
import Main from './components/Main/main';

function App() {
  return (
    <div>
      <Header />
      <Main /> 
    </div>
  );
}

const root = document.querySelector("#root");

render(<App />, root);