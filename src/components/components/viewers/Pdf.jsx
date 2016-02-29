import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
//import PDF from 'react-pdf';
//require('pdfjs-dist/build/pdf.combined')

export default class ViewerPdf extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);

    }
    render() {
      if(__CLIENT__)
        return (
          <div>
            <div className="test">
              {/*<PDF file={this.props.data.url} width="2000"/>*/}
            </div>
          </div>
        );

      return (<div></div>)
    }

}
