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
            <ReactRedirect location={this.props.data.text}><div>Redirecting...</div></ReactRedirect>
        );
    }

}
