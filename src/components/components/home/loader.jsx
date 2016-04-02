import React, {PropTypes} from 'react'

export default class Loader extends React.Component {
    static propTypes = {
        data: PropTypes.array
    }
    constructor(props, context) {
        super(props, context);

    }
    render() {
      let loader;
      if(this.props.data && this.props.data.length > 0) {
        loader = (<div style={{ textAlign: "center" }}>
                <h2 style={{marginTop: '0px'}}>Uploading {this.props.data.length} file...</h2>
                <div>{this.props.data.map((file) => {
                        return file.type.startsWith('image') ? <img style={{width: "20%"}} src={file.preview}/> : <p>No preview</p>
                    })}</div>
            </div>);
      } else {
        loader = (<div style={{ textAlign: "center" }}>
                <h2 style={{marginTop: '0px'}}>We are elaborating your text, if it is a link it will take a bit of time to make all the screenshots</h2>
                <div style={{position:"relative", margin: "50px"}}><div className="loader">
                	<div className="d1"></div>
                	<div className="d2"></div>
                	<div className="d3"></div>
                	<div className="d4"></div>
                	<div className="d5"></div>
                </div></div>
              </div>)
      }
        return loader
    }

}
