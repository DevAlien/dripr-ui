import React, {PropTypes} from 'react';

export default class ViewerImage extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);

    }
    render() {
        return (
            <img src={this.props.data.url} alt="*" />
        );
    }

}
