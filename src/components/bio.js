import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        // const { social } = data.site.siteMetadata
        return (
          <div className="bio">
            <ul className="social-media-list">
              <li>
                <span>
                  <strong className="__handle-title">Github</strong>
                  <a className="username" href="https://github.com/sairion">
                    @sairion
                  </a>
                </span>
              </li>

              <li>
                <span>
                  <strong className="__handle-title">Twitter</strong>
                  <a className="username" href="https://twitter.com/sairion">
                    @sairion
                  </a>
                </span>
              </li>
            </ul>
            <p>
              <strong>Jaeho Lee</strong> is a Seoul-based software engineer building user
              interfaces for websites. <Link to={`/about`}>more</Link>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {

    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
