import React, {PropTypes} from 'react';
import '../../../assets/css/video.css';
import Video from "react-h5-video";

export default class ViewerVideo extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);

    }
    render() {
        return (
            <Video sources={[this.props.data.url]} poster="./video/poster.png" ></Video>
        );
    }

}
