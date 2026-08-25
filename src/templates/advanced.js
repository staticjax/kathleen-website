import React from 'react';
import _ from 'lodash';
import {graphql} from 'gatsby';
import { getPages } from '../utils';
import components, {Layout} from '../components/index';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Advanced extends React.Component {
    render() {
        let sections = _.get(this.props, 'pageContext.frontmatter.sections', null);
        let pages = _.get(this.props, 'pageContext.pages', null);
        // Extract hero, about, etc. for explicit ordering
        let heroSection = _.find(sections, s => _.get(s, 'type') === 'section_hero');
        let aboutSection = _.find(sections, s => _.get(s, 'section_id') === 'about');
        let postsSection = _.find(sections, s => _.get(s, 'type') === 'section_posts');
        let teachingSection = _.find(sections, s => _.get(s, 'section_id') === 'teaching');
        let impactSection = _.find(sections, s => _.get(s, 'section_id') === 'public-impact');
        let mentorshipSection = _.find(sections, s => _.get(s, 'section_id') === 'mentorship');

        // For homepage, render in preview order: hero, signal-strip, about, research themes, latest, publications, teaching+mentorship, impact
        return (
            <Layout {...this.props}>
              {/* Hero */}
              {heroSection && (
                <components.SectionHero {...this.props} section={heroSection} />
              )}

              {/* Signal strip - appointment / fields */}
              <div className="signal-strip" aria-label="Professional overview">
                <div className="signal-item"><span>Appointment</span><strong>Assistant Professor<br />University of South Carolina</strong></div>
                <div className="signal-item"><span>Fields</span><strong>Medical sociology<br />Social demography</strong></div>
              </div>

              {/* About */}
              {aboutSection && (
                <components.SectionContent {...this.props} section={aboutSection} />
              )}

              {/* Research themes - hard-coded to match preview */}
              <section className="section" id="research">
                <div className="wrap">
                  <div className="section-head">
                    <div className="section-index">02 / Research</div>
                    <div>
                      <h2 className="section-title">Bodies, choices, constraints.</h2>
                      <p className="section-intro">My work examines how people navigate reproduction socially and medically, and how institutions, technologies, and social ties shape what becomes possible.</p>
                    </div>
                  </div>
                  <div className="themes">
                    <article className="theme">
                      <span className="theme-number">01</span><span className="theme-mark" aria-hidden="true"></span>
                      <h3>Reproductive health &amp; autonomy</h3>
                      <p>How healthcare encounters, law, and policy shape access, agency, and experiences of care.</p>
                    </article>
                    <article className="theme">
                      <span className="theme-number">02</span><span className="theme-mark" aria-hidden="true"></span>
                      <h3>Fertility goals &amp; decision-making</h3>
                      <p>How people form and revise desires, intentions, and expectations across the life course.</p>
                    </article>
                    <article className="theme">
                      <span className="theme-number">03</span><span className="theme-mark" aria-hidden="true"></span>
                      <h3>Social networks &amp; stigma</h3>
                      <p>How people activate, avoid, and rely on social ties while seeking stigmatized healthcare.</p>
                    </article>
                  </div>
                </div>
              </section>

              {/* Latest research - featured list */}
              {postsSection && (
                <components.SectionPosts {...this.props} section={postsSection} />
              )}

              {/* Publications searchable - full list if we have research pages, otherwise fallback */}
              <section className="section mist" id="publications">
                <div className="wrap">
                  <div className="section-head">
                    <div className="section-index">03 / Publications</div>
                    <div>
                      <h2 className="section-title">Peer-reviewed work.</h2>
                      <p className="section-intro">A searchable publication record, arranged newest first. Student, postdoctoral, and mentee coauthors are identified in the CV.</p>
                    </div>
                  </div>
                  <div className="publication-tools" aria-label="Publication filters">
                    <label className="search-wrap">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2"/></svg>
                      <input id="publication-search" className="search-input" type="search" aria-label="Search publications" placeholder="Search titles, authors, or journals" autoComplete="off" />
                    </label>
                    <div className="filters" role="group" aria-label="Filter by publication year">
                      <button className="filter active" type="button" data-filter="all" aria-pressed="true">All</button>
                      <button className="filter" type="button" data-filter="recent" aria-pressed="false">2025–26</button>
                      <button className="filter" type="button" data-filter="2024" aria-pressed="false">2024</button>
                      <button className="filter" type="button" data-filter="earlier" aria-pressed="false">Earlier</button>
                    </div>
                  </div>
                  <p id="results-note" className="results-note" aria-live="polite"></p>
                  <ol className="publication-list" id="publication-list">
                    {pages && _.map(_.orderBy(getPages(pages, '/research'), 'frontmatter.date', 'desc'), (post, idx) => {
                      let year = post.frontmatter.date ? new Date(post.frontmatter.date).getFullYear() : '';
                      let group = year >= 2025 ? 'recent' : year === 2024 ? '2024' : 'earlier';
                      let excerpt = _.get(post, 'frontmatter.excerpt', '');
                      // Split journal/year for italicizing
                      let journalMatch = excerpt.match(/^(.*?)(\s+\d{4}.*)?$/);
                      let journalPart = excerpt;
                      return (
                        <li key={idx} className="publication" data-year={year} data-group={group}>
                          <div className="publication-year">{year}</div>
                          <div>
                            <h3 className="publication-title">
                              {_.get(post, 'frontmatter.external_url') ? (
                                <a href={_.get(post, 'frontmatter.external_url')} target="_blank" rel="noopener">{_.get(post, 'frontmatter.title')}</a>
                              ) : _.get(post, 'frontmatter.title')}
                            </h3>
                            <p className="publication-cite"><em>{journalPart}</em> {_.get(post, 'frontmatter.external_url') && (<a href={_.get(post, 'frontmatter.external_url')} target="_blank" rel="noopener">Read study ↗</a>)}</p>
                          </div>
                          <span className="publication-dot" aria-hidden="true"></span>
                        </li>
                      )
                    })}
                  </ol>
                  <p className="no-results" id="no-results">No publications match that search.</p>
                </div>
              </section>

              {/* Teaching + Mentorship */}
              {teachingSection && (
                <components.SectionContent {...this.props} section={teachingSection} />
              )}

              {/* Impact */}
              {impactSection && (
                <components.SectionContent {...this.props} section={impactSection} />
              )}

              {/* Inline script for publication filter - same as preview */}
              <script dangerouslySetInnerHTML={{__html: `
                (function(){
                  var input = document.getElementById('publication-search');
                  if(!input) return;
                  var buttons = Array.prototype.slice.call(document.querySelectorAll('.filter'));
                  var pubs = Array.prototype.slice.call(document.querySelectorAll('.publication'));
                  var results = document.getElementById('results-note');
                  var empty = document.getElementById('no-results');
                  var current = 'all';
                  function update(){
                    var q = input.value.trim().toLowerCase();
                    var visible=0;
                    pubs.forEach(function(item){
                      var mf = current==='all' || item.getAttribute('data-group')===current;
                      var mq = !q || item.textContent.toLowerCase().indexOf(q)!==-1;
                      item.hidden = !(mf && mq);
                      if(!item.hidden) visible+=1;
                    });
                    if(results) results.textContent = visible+' publication'+(visible===1?'':'s')+' shown';
                    if(empty) empty.style.display = visible ? 'none' : 'block';
                  }
                  buttons.forEach(function(b){
                    b.addEventListener('click', function(){
                      current = b.getAttribute('data-filter');
                      buttons.forEach(function(x){
                        var active = x===b;
                        x.classList.toggle('active', active);
                        x.setAttribute('aria-pressed', String(active));
                      });
                      update();
                    });
                  });
                  input.addEventListener('input', update);
                  update();
                })();
              `}} />
            </Layout>
        );
    }
}
