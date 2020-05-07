import { h, render, Component} from 'preact';
import Main from './components/Main/main';
import analytics from './analytics'

class App extends Component {
  componentDidMount() {
    analytics.page();
  }

  render() {
    return (
      <div>
        <Main /> 
      </div>
    );
  }
}

const root = document.querySelector("#root");

render(<App />, root);