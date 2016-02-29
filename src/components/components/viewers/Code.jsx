import React, {PropTypes} from 'react';
import '../../../assets/css/tomorrow-night.css';
//import Highlight from 'react-highlight';

export default class ViewerCode extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);

    }
    render() {
        return (
            <Highlight style={{"width": "100px"}} className={(this.props.data.language).toLowerCase()}>{this.props.data.text}</Highlight>
        );
    }

}
