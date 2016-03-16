import React, {PropTypes} from 'react';

export default class XScript extends React.Component {
    static initScripts(el, url) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        el.appendChild(script);
    }
    componentDidMount() {
        XScript.initScripts(React.findDOMNode(this.refs['it']), this.props.url);

    }
    render() {
        return <div ref="it" dangerouslySetInnerHTML={{
            __html: '<script type="text/javascript" src="' + this.props.url + '"></script>'
        }}></div>
    }
}
