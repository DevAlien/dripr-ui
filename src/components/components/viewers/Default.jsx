import React, {PropTypes} from 'react';

export default class ViewerDefault extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);

    }
    render() {
        return (
            <div><h2>Unfortunately we do not handle this file at the moment but you can download it</h2><a style={{"width": "120px", margin: "auto"}} href={this.props.data.url} className="pure-menu-link pure-menu-link-button" download>Download</a></div>
        );
    }

}
