import React, {PropTypes} from 'react';

export default class ViewerText extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);

    }
    render() {
        return (
            <article className="paper">
                <div className="paper_in">{this.props.data.text.split("\n").map(function(item) {
                        return (<span>{item}<br/></span>)
                    })}</div>
            </article>
        );
    }

}
