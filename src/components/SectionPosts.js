import React from 'react'
import _ from 'lodash'
import moment from 'moment-strftime'
import { getPages, Link, withPrefix } from '../utils'

function formatExcerpt(excerpt) {
  if (!excerpt) return null
  const yearMatch = excerpt.match(/\b(19|20)\d{2}\b/)
  if (yearMatch) {
    const yearIdx = excerpt.indexOf(yearMatch[0])
    const journalPart = excerpt.slice(0, yearIdx).trim()
    const yearPart = excerpt.slice(yearIdx).trim()
    return (
      <>
        <em>{journalPart}</em>{yearPart ? ` ${yearPart}` : ''}
      </>
    )
  }
  return <em>{excerpt}</em>
}

export default class SectionPosts extends React.Component {
  render() {
    let section = _.get(this.props, 'section', null)
    let display_posts = _.orderBy(
      getPages(this.props.pageContext.pages, '/research'),
      'frontmatter.date',
      'desc'
    )
    let recent_posts = display_posts.slice(0, _.get(section, 'posts_number', 5))
    return (
      <section className="section dark" aria-labelledby="latest-title" id="latest">
        <div className="wrap">
          <div className="section-head">
            <div className="section-index">Latest research</div>
            <div>
              <h2 className="section-title" id="latest-title">New questions. New evidence.</h2>
              <p className="section-intro">Recent work spans contraceptive autonomy, fertility goals, and the social organization of reproductive healthcare.</p>
            </div>
          </div>
          <div className="featured-list">
            {_.map(recent_posts, (post, post_idx) => (
              <article key={post_idx} className="featured-paper">
                <div className="paper-year">{moment(_.get(post, 'frontmatter.date', null)).strftime('%Y')}</div>
                <div className="paper-copy">
                  <h3>
                    {_.get(post, 'frontmatter.external_url', null) ? (
                      <a href={_.get(post, 'frontmatter.external_url', null)} target="_blank" rel="noopener" style={{color:'inherit', textDecoration:'none'}}>{_.get(post, 'frontmatter.title', null)}</a>
                    ) : (
                      _.get(post, 'frontmatter.title', null)
                    )}
                  </h3>
                  {_.get(post, 'frontmatter.excerpt', null) && (
                    <p>{formatExcerpt(_.get(post, 'frontmatter.excerpt', null))}</p>
                  )}
                  <p className="paper-meta">{_.get(post, 'frontmatter.excerpt', '') ? '' : ''}{/* excerpt already contains journal */}</p>
                </div>
                {_.get(post, 'frontmatter.external_url', null) && (
                  <a className="paper-link" href={_.get(post, 'frontmatter.external_url', null)} target="_blank" rel="noopener">Read study ↗</a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }
}
