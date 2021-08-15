/** @jsx jsx */
import React from "react"
import { graphql } from "gatsby"
import { css, jsx } from "@emotion/react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const CareerItem = ({
  title,
  companyName,
  duration,
  homepage,
  children,
  TitleComponent = "h4",
}) => {
  return (
    <div
      css={css`
        padding-top: 15px;
        h4 a {
          color: var(--global-active-color);
          text-underline-offset: 1px;
        }
      `}
    >
      <TitleComponent>
        <span>{title}</span>, <a href={homepage}>{companyName}</a>{" "}
        {duration ? <sub className="sub-date">{duration}</sub> : null}
      </TitleComponent>
      {children}
    </div>
  )
}

const Summary = ({ children }) => {
  return (
    <div>
      <h5 className="inner-subtitle">Summary</h5>
      <ul>{children}</ul>
    </div>
  )
}

const Projects = ({ children }) => {
  return (
    <div>
      <h5 className="inner-subtitle">Projects</h5>
      <ul>{children}</ul>
    </div>
  )
}

const Experiences = ({ children }) => {
  return (
    <div>
      <h5 className="inner-subtitle">Experiences</h5>
      <ul>{children}</ul>
    </div>
  )
}

const Section = ({ title, children }) => {
  return (
    <div
      css={css`
        margin-bottom: 30px;
      `}
    >
      <h3>{title}</h3>
      {children}
    </div>
  )
}

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="" />
      <div className="post">
        <article className="post-content resume">
          <Section title="My Strength">
            <ul>
              <li>
                <strong>Expert in modern front-end web development</strong>
                <br />
                <p>
                  I have worked with handful of React and ES2015+ based projects
                  on desktop and mobile web, for more than 7 years.
                </p>
              </li>
              <li>
                <strong>Swift learner</strong>
                <br />
                <p>
                  No matter what kind of tooling I'm dealing with, I learn and
                  get used to them pretty fast.
                </p>
              </li>
              <li>
                <strong>Fast prototyping</strong>
                <br />
                <p>
                  With my fast prototyping skills, I can visualize vague
                  imagination into end-user level prototype in short time.
                </p>
              </li>
            </ul>
          </Section>

          <div>
            <h3>Work Experiences</h3>

            <CareerItem
              title="Software Engineer"
              companyName="NexCloud"
              homepage="https://www.nexcloud.co.kr"
              duration="Jan 2021 –"
            >
              <Summary>
                <li>
                  As senior front-end developer, I lead, guide, and educate
                  junior developers
                </li>
              </Summary>
              <Projects>
                <li>
                  Take control of{" "}
                  <a href="https://nexclipper.github.io">NexClipper</a> web
                  console project, develop and maintain features
                </li>
                <li>
                  Prototyping <a href="https://scotty.im">Scotty</a> web console
                  project
                </li>
              </Projects>
            </CareerItem>

            <CareerItem
              title="Product Engineer"
              companyName="Korea Credit Data"
              homepage="https://kcd.co.kr"
              duration="Nov 2019 – Sep 2020"
            >
              <Summary>
                <li>
                  Korean merchant information app{" "}
                  <a href="https://cashnote.kr">Cashnote</a> app development
                  using web technologies (React, TypeScript etc.)
                </li>
              </Summary>
              <Projects>
                <li>
                  Money transfer feature development using Open Banking API,
                  Personal Verification API
                </li>
                <li>
                  Loan suppport feature development for merchants using Credit
                  score API
                </li>
              </Projects>
              <Experiences>
                <li>Apollo (GraphQL) based React app development</li>
                <li>Apollo (GraphQL) based React development</li>
              </Experiences>
            </CareerItem>

            <CareerItem
              title="Software Engineer"
              companyName="Thing Daemon (Fancy)"
              homepage="https://www.fancy.com"
              duration="Oct 2015 – Nov 2019"
            >
              <Summary>
                <li>Work as remote team</li>
              </Summary>
              <Experiences>
                <li>
                  Developed and managed the most of JavaScript used projects in
                  the customer website, admin and merchant tools (React, jQuery)
                </li>
                <li>
                  Built and managed JS bundle system (Webpack, Babel) used for
                  the website
                </li>
                <li>Django-based Backend development for web/app API</li>
              </Experiences>
            </CareerItem>

            <CareerItem
              title="Software Engineer"
              companyName="Spoqa Inc."
              homepage="https://www.spoqa.com"
              duration="Mar 2014 – Oct 2015"
            >
              <Summary></Summary>
              <Projects>
                <li>
                  Developed webapp-based tablet application (Dodo Point) for
                  brick-and-mortar stores
                </li>
                <li>Dodo Point app rewrite</li>
                <li>
                  Developed Dodo Point landing page (https://dodopoint.com) and
                  conducted growth hack tasks (resulted minimum 300% Conversion
                  rate boost, the company started to use the homepage as main
                  business inbound method)
                </li>
                <li>Python backend development</li>
                <li>
                  Developed in-house JavaScript libraries for phone number
                  processing, UI components, etc.
                </li>
                <li>
                  Web admin and business data visualization website (Dodo
                  Insight) development
                </li>
              </Projects>
              <Experiences>
                <li>
                  Heroku, Flask, Libsass-python, Postgres, Google Analytics,
                  Crazyegg
                </li>
                <li>Map based visualization</li>
                <li>Backbone.js and jQuery for maintaining legacy app</li>
                <li>React, Reflux, ES2015+</li>
                <li>internalization/localization</li>
                <li>Flask, SQLAlchemy</li>
                <li>D3, Leaflet.js, Google Fusion Table</li>
                <li>
                  integration tests, functional tests and backend unit tests
                  (Python-Selenium, Pytest)
                </li>
              </Experiences>
            </CareerItem>

            <CareerItem
              title="Developer Intern"
              companyName="Company 100"
              homepage="https://www.crunchbase.com/organization/company100"
              duration="Oct 2013 – Jan 2014"
            >
              <Summary>
                <li>
                  Developed high-performance UI prototypes using Greensock.js
                </li>
              </Summary>
            </CareerItem>
          </div>

          <div>
            <h3 id="skills">Skills/Experiences</h3>

            <ul>
              <li>Highly skilled in front-end web development</li>
              <li>
                Ability to build ES2015-based JavaScript infrastructure and
                workflow
              </li>
              <li>
                HTML5 and legacy browser compatible markup, CSS styling, DOM
                Scripting
              </li>
              <li>
                Ability to develop web-based GUI and SPA using MV*/MVVM/Reactive
                libraries
              </li>
              <li>
                Knowledge of GUI frameworks and CSS preprocessors (Bootstrap,
                Foundation, Compass, Sass, Less…)
              </li>
              <li>
                Backend web development using Flask and SQLAlchemy, PostgresSQL
              </li>
              <li>Wordpress theme and plugin development</li>
              <li>
                Work experience with Node.js, jQuery, React, Babel, Greensock,
                Bash, Jekyll, Git, JIRA, Github, Stash, …
              </li>
              <li>
                Graphic design / UI Design / typography (editorial design) /
                photography and lighting / Adobe tools (Photoshop, Illustrator,
                Indesign)
              </li>
            </ul>
          </div>

          <div>
            <h3 id="education">Education</h3>
            <ul className="education-list">
              <li>
                Bachelor of Fine Arts, Visual Communication Design, Hongik
                University <sub className="sub-date">Mar 2006 - Feb 2012</sub>
              </li>
              <li>
                Bachelor of Science, Computer Science, Korean National Open
                University <sub className="sub-date">Mar 2014 - Feb 2016</sub>
              </li>
            </ul>
          </div>

          <div>
            <h3>Open Source Contributions</h3>

            <ul>
              <li>
                <a href="https://github.com/facebook/react">facebook/react</a>{" "}
                <a href="https://github.com/facebook/react/pull/3240">#3240</a>{" "}
                (translation)
              </li>
              <li>
                <a href="https://github.com/reflux/refluxjs">spoike/reflux</a>{" "}
                <a href="https://github.com/reflux/refluxjs/commit/5a5e6d81a88cabc5e65bce58fded77883ac27bcf">
                  #371
                </a>{" "}
                (bugfix)
              </li>
              <li>
                <a href="https://github.com/nodejs/node">nodejs/node</a>{" "}
                <a href="https://github.com/nodejs/node/pull/494">#494</a>{" "}
                (bugfix)
              </li>
              <li>
                <a href="https://github.com/RazrFalcon/svgcleaner">
                  RazrFalcon/svgcleaner
                </a>{" "}
                <a href="https://github.com/RazrFalcon/svgcleaner/pull/79">
                  #79
                </a>{" "}
                (add feature)
              </li>
            </ul>
          </div>

          <div>
            <h3>Personal Projects</h3>

            <ul>
              <li>
                <a href="https://github.com/webpack-contrib/svg-inline-loader">
                  webpack-contrib/svg-inline-loader
                </a>
              </li>
              <li>
                <a href="https://github.com/sairion/svg-inline-react">
                  sairion/svg-inline-react
                </a>
              </li>

              <li>
                <a href="https://github.com/sairion/buble-loader">
                  sairion/buble-loader
                </a>
              </li>

              <li>
                <a href="https://github.com/sairion/svgcleaner-node">
                  sairion/svgcleaner-node
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 id="language">Language Skills</h3>

            <p>Native Korean, Fluent English, Able to read Japanese</p>
          </div>

          <div>
            <h3 id="interests">Interests</h3>

            <p>
              Web browser, ECMAScript, Data visualization, Developer tools, Open
              source
            </p>
          </div>

          <div>
            <h3 id="featured-articles">Featured Articles</h3>
            <ul>
              <li>
                <a href="https://spoqa.github.io/2015/05/14/living-on-the-edge.html">
                  Living on The Edge: 가장 앞에서 개발 (다시) 시작하기
                </a>{" "}
                (Living on The Edge: Rewriting app on the cutting edge)
              </li>
            </ul>
          </div>

          <div>
            <h3 id="contacts">Contacts</h3>
            <ul>
              <li>
                <a href="https://www.linkedin.com/profile/view?id=102091444">
                  LinkedIn
                </a>
              </li>
              <li>
                email: <a href="mailto:me@jaeholee.org">me@jaeholee.org</a>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
