/** @jsx jsx */
import React from "react"
import { Link } from "gatsby"
import { css, jsx } from "@emotion/react"

import Bio from "./bio"

const Header = () => (
  <header className="site-header">
    <h1>
      <Link to="/">Jaeho Lee</Link>
    </h1>
    <div>
      <span
        className="code"
        css={css`
          font-size: 0.8rem;
          color: #bbb;
          letter-spacing: 2px;
          block-size: min-content;
          background-color: white;
        `}
      >
        software-engineer
      </span>
    </div>
  </header>
)

const Footer = ({ children }) => (
  <footer className="page-content">
    {children}
    <p className="copyright-notice">© Jaeho Lee</p>
  </footer>
)

const Layout = ({ location, children }) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  // const isRoot = location.pathname === rootPath

  return (
    <div>
      <Header />
      <main className="page-content">{children}</main>
      <Footer>
        <Bio />
      </Footer>
    </div>
  )
}

export default Layout
