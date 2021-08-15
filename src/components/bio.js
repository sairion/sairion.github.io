/** @jsx jsx */
import React from "react"
import { Link } from "gatsby"
import { css, jsx } from "@emotion/react"

function Bio() {
  return (
    <div
      className="bio"
      css={css`
        ul {
          list-style: none;
          margin-left: 0;
          margin-bottom: 0;
          padding: 10px 0;
        }
        ul li {
          height: 35px;
          line-height: 35px;
        }

        ul .__handle-title {
          padding-right: 10px;
        }
      `}
    >
      <ul>
        <li>
          <span>
            <strong className="__handle-title">GitHub</strong>
            <a className="username" href="https://github.com/sairion">
              @sairion
            </a>
          </span>
        </li>

        <li>
          <span>
            <strong className="__handle-title">Twitter</strong>
            <a className="username" href="https://twitter.com/jaeholee_dev">
              @jaeholee_dev
            </a>
          </span>
        </li>

        <li>
          <span>
            <strong className="__handle-title">Velog</strong>
            <a className="username" href="https://velog.io/@jaeholee">
              @jaeholee
            </a>
          </span>
        </li>

        <li>
          <Link to={`/about`}>About me</Link>
        </li>
      </ul>
    </div>
  )
}

export default Bio
