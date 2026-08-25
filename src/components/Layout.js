import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';
import {withPrefix} from '../utils';
import '../sass/main.scss';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        let seoTitle = _.get(this.props, 'pageContext.frontmatter.seo.title', null) || _.get(this.props, 'pageContext.frontmatter.title', null);
        let siteTitle = _.get(this.props, 'pageContext.site.siteMetadata.title', null);
        let fullTitle = seoTitle ? (siteTitle ? `${seoTitle} | ${siteTitle}` : seoTitle) : siteTitle;
        return (
            <React.Fragment>
                <Helmet>
                    <title>{fullTitle}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0, viewport-fit=cover" />
                    <meta name="color-scheme" content="light" />
                    <meta name="description" content={_.get(this.props, 'pageContext.frontmatter.seo.description', '') || 'Kathleen Broussard is a sociologist and demographer studying reproductive health, fertility, social networks, and healthcare.'} />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet" />
                    {_.get(this.props, 'pageContext.site.siteMetadata.favicon', null) && (
                    <link rel="icon" href={withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.favicon', null))}/>
                    )}
                </Helmet>
                <Header {...this.props} />
                <main id="main">
                  {this.props.children}
                </main>
                <Footer {...this.props} />
            </React.Fragment>
        );
    }
}
