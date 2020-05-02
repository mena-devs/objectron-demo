import { h, Component, createRef } from 'preact';
import match from '@menadevs/objectron';
import CodeSection from 'components/CodeSection/code-section';
import ExampleLoader from 'components/ExampleLoader/example-loader';
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

    this.state = {
      lastValidPattern: {},
      lastValidPayload: {},
      matchOutput: '',
    }

    this.handlePayloadCodeChange = this.handlePayloadCodeChange.bind(this);
    this.handlePatternCodeChange = this.handlePatternCodeChange.bind(this);
    this.initCodeContent = this.initCodeContent.bind(this);
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

  initCodeContent(codeContent) {
    this.setState({
      initialPatternContent: codeContent.pattern,
      initialPayloadContent: codeContent.payload 
    });
  }

  render() {
    return (
      <div class="main-wrapper">
        <div class="toolbar">
          <ExampleLoader onExampleSelect={this.initCodeContent} />
        </div>
        <div>
          <div class="panels-wrapper">
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
        </div>
      </div>
    );
  }
}