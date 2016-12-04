import React, {PropTypes} from 'react'

import IconDownloadWin from '../icons/IconDownloadWin';
import IconDownloadMac from '../icons/IconDownloadMac';

export default class HomeDownload extends React.Component {
    render() {
        return (
            <div>
                <h5 className="home-about">Download Desktop App</h5>
                <p className="home-sub">Dripr Desktop is a menubar app, so you will have an icon to interact with the app.<br />You will be able to take screenshots and they will be automatically uploaded and you can see the latest files you have uploaded, if you are logged in.</p>
                
                <div className="row">
                <div className="col-md-4">
                	<a className="dload-btn" href="https://files.dripr.io/DriprWin64.zip">
	                	<IconDownloadWin className="home-icon-selected" />
	                	<div>Win 64</div>
                	</a>
                </div>
                <div className="col-md-4">
                	<a className="dload-btn" href="https://files.dripr.io/DriprWin32.zip">
	                	<IconDownloadWin className="home-icon-selected" />
	                	<div>Win 32</div>
                	</a>
                </div>
                <div className="col-md-4">
                	<a className="dload-btn" href="https://files.dripr.io/DriprMacOSX.zip">
		            	<IconDownloadMac className="home-icon-selected" />
		            	<div>Max OS</div>
                	</a>
                </div>
                
                </div>
                <h5 className="home-about" style={{marginTop:'20px'}}>Shortcuts</h5>
                <p className="home-sub">
                	<b>Mac OSX</b><br />
                	Fullscreen screenshot: <b>CMD + SHIFT + A</b><br />
                	Cropped screenshot: <b>CMD + SHIFT + X</b><br />

                	<b>Windows</b><br />
                	Fullscreen screenshot: <b>CTRL + SHIFT + A</b><br />
                	Cropped screenshot: <b>CTRL + SHIFT + X</b>
                </p>
            </div>
        )
    }
}
