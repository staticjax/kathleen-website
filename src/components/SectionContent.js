import React from 'react';
import _ from 'lodash';
import { withPrefix, markdownify } from '../utils';

export default class SectionContent extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let id = _.get(section, 'section_id', null);
        let title = _.get(section, 'title', null);
        let content = _.get(section, 'content', null);

        // ABOUT
        if (id === 'about') {
            return (
              <section className="section dark" id="about">
                <div className="wrap">
                  <div className="section-head">
                    <div className="section-index">01 / About</div>
                    <div><h2 className="section-title">Kathleen Broussard</h2></div>
                  </div>
                  <div className="about-grid">
                    <div className="about-copy">
                      {content ? markdownify(content) : (
                        <React.Fragment>
                          <p>I am an Assistant Professor of Sociology at the University of South Carolina and a faculty affiliate of Women’s and Gender Studies and the Carolina Population Center.</p>
                          <p>I earned my Ph.D. in Sociology at the University of Texas at Austin, where I specialized in demography as a fellow at the Population Research Center, and my M.A. at the University of Chicago.</p>
                        </React.Fragment>
                      )}
                    </div>
                    <div>
                      <div className="about-details">
                        <div className="detail"><span>Based in</span><strong>Columbia, South Carolina</strong></div>
                        <div className="detail"><span>Research interests</span><strong>Reproductive health · Fertility · Social demography</strong></div>
                        <div className="detail"><span>Methods</span><strong>Surveys · Interviews · Content analysis</strong></div>
                      </div>
                      <div className="contact-row">
                        <a className="button" href="mailto:kbroussard@sc.edu">Email Kathleen</a>
                        <a className="button ghost" href="https://sc.edu/study/colleges_schools/artsandsciences/sociology/our_people/faculty_staff_directory/broussard_kathleen.php" target="_blank" rel="noopener">USC profile ↗</a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
        }

        // TEACHING
        if (id === 'teaching') {
            return (
              <section className="section" id="teaching">
                <div className="wrap">
                  <div className="section-head">
                    <div className="section-index">04 / Teaching</div>
                    <div><h2 className="section-title">Courses across sociology, demography, and reproductive health</h2></div>
                  </div>
                  <div className="teaching-grid">
                    <div className="teaching-copy">
                      <blockquote className="teaching-quote">“The classroom remains the most radical space of possibility in the academy.”<cite>— bell hooks</cite></blockquote>
                      <div className="course-list">
                        <div className="course"><span className="course-code">SOCY 749</span><span className="course-name">Population Perspectives of Gender, Sexuality, and Health</span></div>
                        <div className="course"><span className="course-code">SOCY 391</span><span className="course-name">Sociological Research Methods</span></div>
                        <div className="course"><span className="course-code">SOCY 316</span><span className="course-name">Reproductive Governance &amp; Resistance</span></div>
                        <div className="course"><span className="course-code">SOCY 101</span><span className="course-name">Introductory Sociology</span></div>
                      </div>
                    </div>
                    <aside className="mentoring">
                      <h3>Mentorship in practice</h3>
                      <p>Students and mentees contribute meaningfully to collaborative research and publication.</p>
                      <ul className="mentor-points">
                        <li><span>4</span><div>Graduate theses and dissertations</div></li>
                        <li><span>10</span><div>Undergraduate honors and independent projects</div></li>
                        <li><span>3</span><div>Publications co-authored with students</div></li>
                      </ul>
                    </aside>
                  </div>
                </div>
              </section>
            );
        }

        // PUBLIC IMPACT
        if (id === 'public-impact') {
            return (
              <section className="section mist" id="impact">
                <div className="wrap">
                  <div className="section-head">
                    <div className="section-index">05 / Public impact</div>
                    <div><h2 className="section-title">Beyond the classroom</h2></div>
                  </div>
                  <div className="impact-grid">
                    <div className="impact-statement">
                      <p>Research has informed legal briefs, legislative consultation, public scholarship, and national reporting.</p>
                      <a className="press-link" href="/press/">View all media coverage ↗</a>
                      <div className="selected-press" style={{marginTop:'2rem', paddingTop:'1.5rem', borderTop:'1px solid var(--line)'}}>
                        <h4 style={{margin:'0 0 1rem', fontFamily:'var(--serif)', fontSize:'1.15rem', fontWeight:600}}>Selected media coverage</h4>
                        <ul style={{listStyle:'none', margin:0, padding:0}}>
                          <li style={{marginBottom:'.85rem'}}><em>The Conversation</em> | June 2024<br/><a href="https://theconversation.com/abortion-bans-are-changing-what-it-means-to-be-young-in-america-231251" target="_blank" rel="noopener" style={{color:'var(--garnet)', fontWeight:600}}>Abortion bans are changing what it means to be young in America ↗</a></li>
                          <li style={{marginBottom:'.85rem'}}><em>TIME</em> | May 2024<br/><a href="https://time.com/6976918/long-term-birth-control-reproductive-coercion" target="_blank" rel="noopener" style={{color:'var(--garnet)', fontWeight:600}}>‘I Don’t Have Faith in Doctors Anymore.’ Women Say They Were Pressured Into Long-Term Birth Control ↗</a></li>
                          <li style={{marginBottom:'.85rem'}}><em>The New Yorker</em> | November 2021<br/><a href="https://www.newyorker.com/news/news-desk/what-does-an-at-home-abortion-look-like-in-2021" target="_blank" rel="noopener" style={{color:'var(--garnet)', fontWeight:600}}>What Does an At-Home Abortion Look Like in 2021? ↗</a></li>
                          <li style={{marginBottom:'.85rem'}}><em>The New York Times</em> | September 2019<br/><a href="https://www.nytimes.com/2019/09/20/upshot/abortion-pills-rising-use.html" target="_blank" rel="noopener" style={{color:'var(--garnet)', fontWeight:600}}>Why America’s Abortion Rate Might Be Higher Than It Appears ↗</a></li>
                          <li style={{marginBottom:'.25rem'}}><em>The Atlantic</em> | July 2018<br/><a href="https://www.theatlantic.com/health/archive/2018/07/after-abortion-is-illegal/565430/" target="_blank" rel="noopener" style={{color:'var(--garnet)', fontWeight:600}}>Illegal Abortion Will Mean Abortion By Mail ↗</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="impact-list">
                      <article className="impact-item"><time>2026</time><div><h3>Fifth Circuit Court of Appeals</h3><p>Contributor to an amicus brief in <em>Louisiana v. FDA</em> in the capacity of a reproductive health researcher.</p></div></article>
                      <article className="impact-item"><time>2024</time><div><h3>Supreme Court of the United States</h3><p>Contributor to amicus briefs in <em>Bryant v. Stein</em> and <em>FDA v. Alliance for Hippocratic Medicine</em>.</p></div></article>
                      <article className="impact-item"><time>2021</time><div><h3>Dobbs v. Jackson Women’s Health Organization</h3><p>Research on online telemedicine and self-managed abortion cited in an amicus brief.</p></div></article>
                      <article className="impact-item"><time>2019</time><div><h3>Northern Ireland Office consultation</h3><p>Research referenced in written testimony on legislation governing abortion services.</p></div></article>
                      <article className="impact-item"><time>2017</time><div><h3>Irish Citizens’ Assembly</h3><p>Research used in deliberations over a referendum to repeal the Eighth Amendment.</p></div></article>
                    </div>
                  </div>
                </div>
              </section>
            );
        }

        // MENTORSHIP - merged into teaching, skip duplicate rendering
        if (id === 'mentorship') {
            return null;
        }

        // FALLBACK generic
        return (
            <section id={id} className="section">
              <div className="wrap">
                <div className="section-head">
                  <div className="section-index">{title}</div>
                  <h2 className="section-title">{title}</h2>
                </div>
                <div className="block-content">
                  {content && markdownify(content)}
                </div>
              </div>
            </section>
        );
    }
}
