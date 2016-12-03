import React, {PropTypes} from 'react'

export default class HomeWeb extends React.Component {
    static propTypes = {
        createScreenshots: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    onChange = (event) => {
        let value = event.target.value;
        this.setState({text: value});
    }

    render() {
        return (
            <div>
                <span>Paste URL to take a screenshot of it</span>
                <div className="input-group input-group-lg" style={{marginTop: '20px'}}>
                  <input type="text" value={this.state.text} className="form-control f-web-input" placeholder="https://dripr.io" onChange={this.onChange}/>
                  <span className="input-group-btn">
                    <button className="btn btn-primary" type="button" onClick={this.requestScreenshots}>Create!</button>
                  </span>
                </div>
            </div>
        )
    }

    requestScreenshots = () => {
        this.props.createScreenshots(this.state.text);
    }
}
