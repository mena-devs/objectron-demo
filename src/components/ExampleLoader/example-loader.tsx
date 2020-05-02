import { h, Component, createRef } from 'preact';


export default class ExampleLoader extends Component {
  examples = [
    {
      title: 'Simple match',
      payload: `{\n  'type': 'message',\n  'text': 'text',\n}\n`,
      pattern: `{\n  'type': 'message',\n  'text': 'text',\n}\n`
    },
    {
      title: 'Simple match with RegEx',
      payload: `{\n  'type': 'message',\n  'text': 'invite Smith',\n}\n`,
      pattern: `{\n  'type': 'message',\n  'text': /invite (\S+)/,\n}\n`
    },
    {
      title: 'Simple match with RegEx',
      payload: `{\n  'type': 'message',\n  'text': 'text',\n  'int': 1,\n  'bool': true,\n  'float': 1.1,\n  'items': [1, 1, 1, 1],\n}\n`,
      pattern: `{\n  'type': (val) => val === 'message',\n  'text': (val) => val.length == 4,\n  'int': (val) => val + 1 == 2,\n  'bool': (val) => !!!!!!!!val,\n  'float': (val) => val - 1.1 == 0,\n  'items': (val) => val.length == 4,\n}\n`
    }
  ];

  constructor() {
    super();
    this.handleExampleSelectChange = this.handleExampleSelectChange.bind(this);
  }

  handleExampleSelectChange(e) {
    let selectedIndex = e.target.selectedIndex;
    if (typeof(this.examples[selectedIndex]) != 'undefined') {
      this.props.onExampleSelect(this.examples[selectedIndex]);
    }
  }

  componentDidMount() {
    this.props.onExampleSelect(this.examples[0]);
  }

  render() {
    return (<div>
      Preloaded examples 
      <select onChange={this.handleExampleSelectChange}>
        {this.examples.map(option =>
          <option value="Simple">{option.title}</option>
        )}
      </select>
    </div>);
  }
}