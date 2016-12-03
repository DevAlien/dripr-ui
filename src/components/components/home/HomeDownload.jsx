import React, {PropTypes} from 'react'

import IconDownloadWin from '../icons/IconDownloadWin';
import IconDownloadMac from '../icons/IconDownloadMac';

export default class HomeDownload extends React.Component {
    render() {
        return (
            <div>
                <h5 className="home-about">Why Dripr.io?</h5>
                <p className="home-sub">Dripr...</p>
                <div className="row">
                <div className="col-md-4">
                	<IconDownloadWin className="home-icon-selected" />
                	<div>Win 64</div>
                </div>
                <div className="col-md-4">
                	<IconDownloadWin className="home-icon-selected" />
                	<div>Win 32</div>
                </div>
                <div className="col-md-4">
                	<IconDownloadMac className="home-icon-selected" />
                	<div>Max OS</div>
                </div>
                
                </div>
            </div>
        )
    }
}
