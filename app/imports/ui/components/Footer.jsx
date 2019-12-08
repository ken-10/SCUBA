import React from 'react';
import { Button } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  siteRedirect() {
    const url = 'https://github.com/ken-10';
    window.open(url, '_blank');
  }

  siteRedirect2() {
    const url = 'https://github.com/jhunDomingo';
    window.open(url, '_blank');
  }


  render() {
    const divStyle = { paddingTop: '3%', paddingBottom: '7%' };
    return (
        <footer style={{ height: '100%', backgroundColor: '#475F6F', color: 'whitesmoke' }}>
          <div style={divStyle} className="ui fluid center aligned container">
            <hr/>
            <div>
              <Button circular icon={'github'} className={'footerButton'} onClick={this.siteRedirect}/>
              <Button circular icon={'github'} className={'footerButton'} onClick={this.siteRedirect2}/>
            </div>
            <div className="footer-text">
              myDiver • University of Hawaiʻi at Mānoa • 2500 Campus Road • Honolulu, HI 96822<br/>
              <div className="footer-text-2">
              DISCLAIMER: myDiver should not be used in any real life scenario. It is purely a software project for ICS
              414 at University of Hawaiʻi at Mānoa
              </div>
            </div>
          </div>
        </footer>
    );
  }
}

export default Footer;
