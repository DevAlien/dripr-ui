import React, {PropTypes} from 'react'

export default class HomeCode extends React.Component {
    static propTypes = {
        submit: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            value: 'text'
        }
        this.textTypeOptions = [
            { label: 'Text',    value: 'text' },
            { label: 'Javascript',  value: 'javascript' },
            { label: 'Java', value: 'java' },
            { label: 'XML',    value: 'xml' },
            { label: 'HTML', value: 'html'}
        ];
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    changeText(event) {
        this.setState({text: event.target.value});
      }
    submit() {
        this.props.submit(this.state.text, this.state.value);
    }

    render() {
        return (
            <div>
                <span>Paste text or code to get it formatted and/or highlighted</span>
                <div style={{marginTop: '20px'}}>
                    <textarea value={this.state.text} onChange={this.changeText.bind(this)} className="form-control f-code-text" rows="5"></textarea>
                    <select className="form-control f-code-select" value={this.state.value} onChange={this.handleChange.bind(this)}>
                        {this.textTypeOptions.map((o) => <option value={o.value}>{o.label}</option>)}
                    </select>
                    <div className="btn btn-primary btn-lg" style={{marginTop: "15px"}} onClick={this.submit.bind(this)}>Submit</div>
                </div>
            </div>
        )
    }
}
