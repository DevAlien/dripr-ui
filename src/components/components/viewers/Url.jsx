import React, {PropTypes} from 'react';

export default class ViewerUrl extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);

    }
    render() {
        return (
          <div>
            <h2>We made some screenshots for <a href={this.props.data.text}>{this.props.data.text}</a></h2>
            <div>You can download a zip containing the screenshot and below that there's a preview</div>
            <div style={{marginTop: "10px", marginBottom: "10px"}}><a style={{"width": "120px", margin: "auto"}} href={this.props.data.zip} className="pure-menu-link pure-menu-link-button" download>Download</a></div>
            <img src={this.props.data.cover} alt="*" />
          </div>
        );
    }

}
