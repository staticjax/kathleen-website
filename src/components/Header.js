import React from 'react';
import { withPrefix } from '../utils';

export default class Header extends React.Component {
    render() {
        return (
            <React.Fragment>
              <a className="skip-link" href="#main">Skip to content</a>
              <nav className="site-nav" aria-label="Primary navigation">
                <div className="nav-links">
                  <a href="#about">About</a>
                  <a href="#research">Research</a>
                  <a href="#publications"><span className="nav-long">Publications</span><span className="nav-short">Work</span></a>
                  <a href="#teaching">Teaching</a>
                  <a href="#impact">Impact</a>
                  <a className="cv-link" href={withPrefix('/CV_Broussard.pdf')}><span className="nav-long">Download CV</span><span className="nav-short">CV</span></a>
                </div>
              </nav>
            </React.Fragment>
        );
    }
}
