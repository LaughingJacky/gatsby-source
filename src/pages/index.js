import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import 'gitalk/dist/gitalk.css'
import get from 'lodash/get'

import Banner from '../components/Banner'

import pic04 from '../assets/images/pic04.jpg'
import pic06 from '../assets/images/pic06.jpg'

// Prevent webpack window problem
const isBrowser = typeof window !== 'undefined'
const Gitalk = isBrowser ? require('gitalk') : undefined

class HomeIndex extends React.Component {
  componentDidMount() {
    // Gitalk
    const gitalk = new Gitalk({
      clientID: '7d15c5c496b35e601dae',
      clientSecret: '25fb2be35286f43cd6e59167fcd2b98c2dc5500f',
      repo: 'gitalk',
      owner: 'LaughingJacky',
      admin: ['LaughingJacky'],
      distractionFreeMode: true,
    })
    gitalk.render('gitalk-container')
  }

  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = get(this.props, 'data.site.siteMetadata.description')
    const latestPosts = get(this.props, 'data.latestPosts.edges')
    return (
      <div>
        <Helmet>
          <title>{siteTitle}</title>
          <meta name="description" content={siteDescription} />
        </Helmet>

        <Banner />

        <div id="main">
          <section id="one" className="tiles">
            <article style={{ backgroundImage: `url(${pic04})` }}>
              <header className="major">
                <h3>博客列表</h3>
              </header>
              <Link to="/blogList/1" className="link primary" />
            </article>
            <article style={{ backgroundImage: `url(${pic06})` }}>
              <header className="major">
                <h3>标签</h3>
              </header>
              <Link to="/tags" className="link primary" />
            </article>
            {latestPosts.map(({ node }) => (
              <article
                style={{ backgroundImage: `url(${node.headImg})` }}
                key={node.title}
              >
                <header className="major">
                  <h3>{node.title}</h3>
                  <p>{node.description}</p>
                </header>
                <Link to={`/blog/${node.slug}`} className="link primary" />
              </article>
            ))}
          </section>
          <section id="two">
            <div className="inner">
              <header className="major">
                <h2>Massa libero</h2>
              </header>
              <p>
                Nullam et orci eu lorem consequat tincidunt vivamus et sagittis
                libero. Mauris aliquet magna magna sed nunc rhoncus pharetra.
                Pellentesque condimentum sem. In efficitur ligula tate urna.
                Maecenas laoreet massa vel lacinia pellentesque lorem ipsum
                dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et
                sagittis libero. Mauris aliquet magna magna sed nunc rhoncus
                amet pharetra et feugiat tempus.
              </p>
              <ul className="actions">
                <li>
                  <Link to="/landing" className="button next">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <div id="gitalk-container" />
      </div>
    )
  }
}

export default HomeIndex

export const pageQuery = graphql`
  query PageQuery {
    latestPosts: allContentfulBlogPost(
      limit: 4
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          title
          slug
          headImg
          description
        }
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
