import { h, Component, createRef } from 'preact';
import match from '@menadevs/objectron';
import CodeSection from 'components/CodeSection/code-section';
import './main-style.css';


type MainState = {
  lastValidPattern: Object,
  lastValidPayload: Object,
  matchOutput: string,
  initialPatternContent: string,
  initialPayloadContent: string
}

export default class Main extends Component<{}, MainState>{
  constructor() {
    super();

    this.handlePayloadCodeChange = this.handlePayloadCodeChange.bind(this);
    this.handlePatternCodeChange = this.handlePatternCodeChange.bind(this);
  }

  handlePatternCodeChange(patternValue: Object) {
    this.setState({
      lastValidPattern: patternValue  
    }, () => {
      this.evaluateMatch()
    });
  }

  handlePayloadCodeChange(payloadValue: Object) {
    this.setState({
      lastValidPayload: payloadValue  
    }, () => {
      this.evaluateMatch()
    });
  }

  evaluateMatch() {
    let matchResult = match(this.state.lastValidPayload, this.state.lastValidPattern);

    this.setState({
      matchOutput: JSON.stringify(matchResult, null, 2)
    });
  }

  componentDidMount() {
    this.setState({
      lastValidPattern: {},
      lastValidPayload: {},
      matchOutput: '',
      initialPatternContent: `{\n'type': 'message', \n'text': /invite (\S+)/\n}`,
      initialPayloadContent: `{\n'type': 'message', \n'text': 'invite Smith'\n}`
    });
  }

  render() {
    return (
      <div class="wrapper">
        <aside class="c-input">
          <CodeSection title="Object" 
            onChange={this.handlePayloadCodeChange} 
            content={this.state.initialPayloadContent}/>
        </aside>
        <main class="c-output">
          <CodeSection title="Pattern" 
            onChange={this.handlePatternCodeChange} 
            content={this.state.initialPatternContent}/>

          <CodeSection title="Output" readOnly={true} content={this.state.matchOutput} />
        </main>
      </div>
    );
  }
}