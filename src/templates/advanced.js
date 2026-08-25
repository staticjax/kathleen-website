import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';
import { getPages, withPrefix } from '../utils';
import { Layout } from '../components/index';

export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

function formatExcerpt(excerpt) {
  if (!excerpt) return null;
  const yearMatch = excerpt.match(/\b(19|20)\d{2}\b/);
  if (yearMatch) {
    const idx = excerpt.indexOf(yearMatch[0]);
    const journal = excerpt.slice(0, idx).trim();
    const rest = excerpt.slice(idx).trim();
    return (<><em>{journal}</em>{rest ? ` ${rest}` : ''}</>);
  }
  return <em>{excerpt}</em>;
}

export default class Advanced extends React.Component {
  render() {
    const sections = _.get(this.props, 'pageContext.frontmatter.sections', []);
    const pages = _.get(this.props, 'pageContext.pages', []);
    const site = _.get(this.props, 'pageContext.site', {});
    const headshot = _.get(site, 'siteMetadata.header.profile_img', '/images/kathleen-broussard-headshot-new.jpg');

    const hero = _.find(sections, s => _.get(s, 'type') === 'section_hero') || { title: 'Kathleen Broussard, Ph.D.', content: 'Sociologist & Demographer, University of South Carolina' };

    const displayPosts = _.orderBy(getPages(pages, '/research'), 'frontmatter.date', 'desc');
    const recent = displayPosts.slice(0, 5);

    return (
      <Layout {...this.props}>
        <section className="hero" aria-labelledby="hero-title" id="hero">
          <div className="hero-copy">
            <p className="identity">{_.get(hero, 'content', 'Sociologist & Demographer, University of South Carolina')}</p>
            <h1 id="hero-title">{_.get(hero, 'title', 'Kathleen Broussard, Ph.D.')}</h1>
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

        <div className="signal-strip" aria-label="Professional overview">
          <div className="signal-item"><span>Appointment</span><strong>Assistant Professor<br />University of South Carolina</strong></div>
          <div className="signal-item"><span>Fields</span><strong>Medical sociology<br />Social demography</strong></div>
        </div>

        <section className="section dark" id="about">
          <div className="wrap">
            <div className="section-head">
              <div className="section-index">01 / About</div>
              <div><h2 className="section-title">Kathleen Broussard</h2></div>
            </div>
            <div className="about-grid">
              <div className="about-copy">
                <p>I am an Assistant Professor of Sociology at the University of South Carolina and a faculty affiliate of Women’s and Gender Studies and the Carolina Population Center.</p>
                <p>I earned my Ph.D. in Sociology at the University of Texas at Austin, where I specialized in demography as a fellow at the Population Research Center, and my M.A. at the University of Chicago.</p>
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
              <article className="theme"><span className="theme-number">01</span><span className="theme-mark" aria-hidden="true"></span><h3>Reproductive health &amp; autonomy</h3><p>How healthcare encounters, law, and policy shape access, agency, and experiences of care.</p></article>
              <article className="theme"><span className="theme-number">02</span><span className="theme-mark" aria-hidden="true"></span><h3>Fertility goals &amp; decision-making</h3><p>How people form and revise desires, intentions, and expectations across the life course.</p></article>
              <article className="theme"><span className="theme-number">03</span><span className="theme-mark" aria-hidden="true"></span><h3>Social networks &amp; stigma</h3><p>How people activate, avoid, and rely on social ties while seeking stigmatized healthcare.</p></article>
            </div>
          </div>
        </section>

        <section className="section dark" aria-labelledby="latest-title">
          <div className="wrap">
            <div className="section-head">
              <div className="section-index">Latest research</div>
              <div>
                <h2 className="section-title" id="latest-title">New questions. New evidence.</h2>
                <p className="section-intro">Recent work spans contraceptive autonomy, fertility goals, and the social organization of reproductive healthcare.</p>
              </div>
            </div>
            <div className="featured-list">
              {recent.map((post, i) => {
                const year = post.frontmatter.date ? new Date(post.frontmatter.date).getFullYear() : '';
                return (
                  <article key={i} className="featured-paper">
                    <div className="paper-year">{year}</div>
                    <div className="paper-copy">
                      <h3>{_.get(post, 'frontmatter.title')}</h3>
                      {_.get(post, 'frontmatter.excerpt') && <p>{formatExcerpt(_.get(post, 'frontmatter.excerpt'))}</p>}
                      <p className="paper-meta">{_.get(post, 'frontmatter.excerpt') ? '' : ''} </p>
                    </div>
                    {_.get(post, 'frontmatter.external_url') && <a className="paper-link" href={_.get(post, 'frontmatter.external_url')} target="_blank" rel="noopener">Read study ↗</a>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

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
              {_.orderBy(getPages(pages, '/research'), 'frontmatter.date', 'desc').map((post, idx) => {
                const year = post.frontmatter.date ? new Date(post.frontmatter.date).getFullYear() : '';
                const group = year >= 2025 ? 'recent' : year === 2024 ? '2024' : 'earlier';
                return (
                  <li key={idx} className="publication" data-year={year} data-group={group}>
                    <div className="publication-year">{year}</div>
                    <div>
                      <h3 className="publication-title">
                        {_.get(post, 'frontmatter.external_url') ? <a href={_.get(post, 'frontmatter.external_url')} target="_blank" rel="noopener">{_.get(post, 'frontmatter.title')}</a> : _.get(post, 'frontmatter.title')}
                      </h3>
                      <p className="publication-cite">{_.get(post, 'frontmatter.excerpt') && formatExcerpt(_.get(post, 'frontmatter.excerpt'))} {_.get(post, 'frontmatter.external_url') && <a href={_.get(post, 'frontmatter.external_url')} target="_blank" rel="noopener">Read study ↗</a>}</p>
                    </div>
                    <span className="publication-dot" aria-hidden="true"></span>
                  </li>
                );
              })}
            </ol>
            <p className="no-results" id="no-results">No publications match that search.</p>
          </div>
        </section>

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

        <script dangerouslySetInnerHTML={{__html: `
          (function(){
            var input = document.getElementById('publication-search');
            if(!input) return;
            var buttons = Array.prototype.slice.call(document.querySelectorAll('.filter'));
            var pubs = Array.prototype.slice.call(document.querySelectorAll('.publication'));
            var results = document.getElementById('results-note');
            var empty = document.getElementById('no-results');
            var current='all';
            function update(){
              var q=input.value.trim().toLowerCase();
              var visible=0;
              pubs.forEach(function(item){
                var mf=current==='all'||item.getAttribute('data-group')===current;
                var mq=!q||item.textContent.toLowerCase().indexOf(q)!==-1;
                item.hidden=!(mf&&mq);
                if(!item.hidden) visible+=1;
              });
              if(results) results.textContent=visible+' publication'+(visible===1?'':'s')+' shown';
              if(empty) empty.style.display=visible?'none':'block';
            }
            buttons.forEach(function(b){
              b.addEventListener('click',function(){
                current=b.getAttribute('data-filter');
                buttons.forEach(function(x){
                  var active=x===b;
                  x.classList.toggle('active',active);
                  x.setAttribute('aria-pressed',String(active));
                });
                update();
              });
            });
            input.addEventListener('input',update);
            update();
          })();
        `}} />
      </Layout>
    );
  }
}
