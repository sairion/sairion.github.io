import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
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
                  <a
                    className="username"
                    href="https://twitter.com/jaeholee_dev"
                  >
                    @jaeholee_dev
                  </a>
                </span>
              </li>
            </ul>
            <p>
              <strong>Jaeho Lee</strong> is a Seoul-based software engineer
              building user interfaces for websites.{" "}
              <Link to={`/about`}>more</Link>
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
