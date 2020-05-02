import { h, Component, createRef } from 'preact';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import './code-section-style.css';


type CodeSectionProps = {
  content: string,
  onChange: Function,
  title: string,
  readOnly: boolean
}

type CodeSectionState = {
  codeIsValid: boolean
}

export default class CodeSection extends Component<CodeSectionProps, CodeSectionState> {
  inputRef = createRef();
  cm = CodeMirror();

  constructor() {
    super();
    this.editorValueChanged = this.editorValueChanged.bind(this);
    this.state = {
      codeIsValid: true
    }
  }

  editorValueChanged(e) {
    if(typeof(this.props.onChange) != 'undefined' && !this.props.readOnly) {
      try {
        let evaluatedObject = this.loadObjectFromString(e.getValue());

        if(evaluatedObject instanceof Object) {
          this.setState({
            codeIsValid: true
          }, () => {
            this.props.onChange(evaluatedObject);
          });
        } else {
          throw 'Evaluated code is not an object';
        }
      } catch(e) {
        this.setState({
          codeIsValid: false
        });
      }
    }
  }

  componentDidMount() {
    this.cm = CodeMirror.fromTextArea(this.inputRef.current, {
      lineNumbers: true, 
      mode: "javascript", 
      theme: "dracula",
      lineWrapping: true,
      tabSize: 2,
      readOnly: this.props.readOnly
    });

    this.cm.on('change', this.editorValueChanged);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.content != this.props.content) {
      this.cm.setValue(this.props.content);
    }
  }

  loadObjectFromString(input) {
    try {
      let evaluatedValue = (eval('('+input+')'));
      return evaluatedValue;
    } catch(e) {
      throw 'Invalid syntax or missing object';
    }
  }

  render() {
    return (
      <section className={(this.state.codeIsValid) ? 'area-container':'area-container--invalid'}>
        <h2 className="section-title">{this.props.title}</h2>
        <textarea id="pattern-input" ref={this.inputRef}></textarea>
      </section>
    );
  }
}
