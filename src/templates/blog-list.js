import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import { isBrowser, getUrl } from '../api'
import Pagination from '../components/Pagination/index'
import Layout from '../components/Layouts/index'

const BlogList = ({ data = {}, pageContext }) => (
  <Layout>
    <div className="page-blog-list">
      <Helmet title="文章列表" />
      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>文章列表</h1>
            </header>
            {data.allContetfulBlogPost.edges.map(({ node }) => {
              const {
                description, headImg, publishDate, title, formattedDate,
              } = node
              return (
                <section id="two" className="spotlights" key={title}>
                  <section>
                    <Link to={getUrl(publishDate, title)} className="image">
                      <img src={headImg} alt="" />
                    </Link>
                    <div className="content">
                      <div className="inner">
                        <Link to={getUrl(publishDate, title)}>
                          <header className="major">
                            <h3 className="one-line">
                              <span className="pub-date">{formattedDate}</span>
                              <span>{title}</span>
                            </h3>
                          </header>
                          <p className="desc">{description}</p>
                        </Link>
                        <ul className="actions">
                          <li>
                            <Link to={getUrl(publishDate, title)} className="button">
                              Learn more
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </section>
              )
            })}
          </div>
        </section>
        <Pagination pageNum={pageContext.pagesLength} pathname={isBrowser() ? window.location.pathname : ''} />
      </div>
    </div>
  </Layout>
)

BlogList.propTypes = {
  data: PropTypes.object,
}

export default BlogList

export const pageQuery = graphql`
  query BlogIndexQuery($limit: Int, $skip: Int) {
    allContetfulBlogPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          slug
          publishDate
          formattedDate: publishDate(formatString: "MMMM Do, YYYY")
          headImg
          description
        }
      }
    }
  }
`
