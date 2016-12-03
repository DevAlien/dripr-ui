import React, {PropTypes} from 'react'
import Dropzone from 'react-dropzone';
import Loader from './loader';

export default class HomeUpload extends React.Component {
    static propTypes = {
        onDrop: PropTypes.func.isRequired,
        isUploaing: PropTypes.bool.required
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            isDrag: false,
            files: []
        }
    }

    render() {
        let cName = 'f-upload-container';
        let content = <span>Click or Drop a file here</span>;
        if (this.state.isDrag) {
            cName = cName + ' ';
            content = <span>Drop File</span>
        }
        if (this.props.isUploading) {
            content = <Loader data={this.state.files} />
        }
        return (
            <Dropzone onDrop={this.onDrop.bind(this)} ref="dropzone" className="f-upload-container" onDragEnter={this.onDragEnter.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)} activeClassName="ondrop" disableClick={false} multiple={false}>
                {content}
            </Dropzone>
        )
    }

    onDrop(files) {
        this.setState({files: files});
        this.props.onDrop(files);
    }
    onDragEnter(files) {
        if(!this.state.isDrag)
          this.setState({isDrag: true});
    }

    onDragLeave(files) {
      if(this.state.isDrag)
        this.setState({isDrag: false});
    }

    onDragOver(files) {
      if(this.state.isDrag)
        this.setState({isDrag: false});
    }
}
