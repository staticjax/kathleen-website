import React from 'react';
import _ from 'lodash';
import { markdownify, withPrefix } from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionHero extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let title = _.get(section, 'title', 'Kathleen Broussard, Ph.D.');
        let tagline = _.get(section, 'content', 'Sociologist & Demographer, University of South Carolina');
        // Use headshot from siteMetadata or fallback
        let headshot = _.get(this.props, 'pageContext.site.siteMetadata.header.profile_img', '/images/kathleen-broussard-headshot-new.jpg');
        return (
            <section className="hero" aria-labelledby="hero-title" id={_.get(section, 'section_id', 'hero')}>
              <div className="hero-copy">
                <p className="identity">{typeof tagline === 'string' ? tagline : 'Sociologist & Demographer, University of South Carolina'}</p>
                <h1 id="hero-title">{title}</h1>
                <p className="hero-summary">I study the individual, social, and structural forces that shape fertility, reproductive healthcare, and bodily autonomy—using surveys, interviews, and content analysis.</p>
                <div className="hero-actions">
                  <a className="button" href="#research">Explore the research <span className="arrow" aria-hidden="true">↓</span></a>
                  <a className="button ghost" href="mailto:kbroussard@sc.edu">Get in touch</a>
                </div>
              </div>
              <div className="hero-graphic">
                <img className="hero-portrait" src={withPrefix(headshot)} alt="Portrait of Kathleen Broussard" />
              </div>
            </section>
        );
    }
}
