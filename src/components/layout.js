import React from "react"
import { Link } from "gatsby"

import Bio from "./bio"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1>
        <Link to={`/`}>{title}</Link>
      </h1>
    )
  } else {
    header = (
      <h3>
        <Link to={`/`}>{title}</Link>
      </h3>
    )
  }
  return (
    <div>
      <header className="site-header">{header}</header>
      <main className="page-content">{children}</main>
      <footer className="page-content">
        <Bio />
        <p className="copyright-notice">© 2021 Jaeho Lee</p>
      </footer>
    </div>
  )
}

export default Layout
