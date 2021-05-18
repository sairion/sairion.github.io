import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="" />
      <div className="post">
        <article className="post-content resume">
          <h3 id="strength">Strength</h3>
          <ul>
            <li>
              Expert in Modern Front-end Web Development and UI Design
              Implementation
            </li>
            <li>Highly Focused, Fast Learner</li>
            <li>Communication-Oriented Development</li>
          </ul>

          <h3 id="work-experiences">Work Experiences</h3>

          <h4 id="software-engineer-thing-daemon-fancy-oct-2015--">
            Software Engineer,{" "}
            <a href="https://www.fancy.com">Thing Daemon (Fancy)</a>{" "}
            <sub className="sub-date">Oct 2015 – Feb 2021</sub>
          </h4>
          <ul>
            <li>Work as remote team</li>
            <li>
              Developed and managed the most of JavaScript used projects in the
              customer-seeing website, admin and merchant tools (React, jQuery)
            </li>
            <li>
              Built and managed JS bundle system (Webpack, Babel) used for the
              website
            </li>
            <li>Django-based Backend development for web/app API</li>
          </ul>

          <h4 id="software-engineer-spoqa-inc-march-2014--oct-2015">
            Software Engineer, <a href="https://www.spoqa.com">Spoqa Inc.</a>{" "}
            <sub className="sub-date">March 2014 – Oct 2015</sub>
          </h4>
          <ul>
            <li>
              Webapp-based tablet application (Dodo Point) development
              (Backbone.js and jQuery, etc.)
            </li>
            <li>Dodo Point web app Rewrite (React, Reflux, ES2015+, etc.)</li>
            <li>
              Designed and developed Front-end web development workflow and test
              environment
            </li>
            <li>
              Developed in-house JavaScript libraries for phone number
              processing, ajax request-response wrapper, UI components, etc.
            </li>
            <li>
              Developed Dodo Point landing page (https://dodopoint.com) and
              conducted growth hack tasks using Heroku, Flask, Libsass-python,
              Postgres, Google Analytics, Crazyegg (resulted minimum 300%
              Conversion rate boost)
            </li>
            <li>
              Experience with Authentication, Internalization/Localization and
              Mail/SMS/MMS sending procedures
            </li>
            <li>
              Web admin and business data visualization website (Dodo Insight)
              development experience
            </li>
            <li>Python backend development (Flask and SQLAlchemy)</li>
            <li>
              Experience with integration tests, functional tests and backend
              unittests (Python-Selenium, Pytest)
            </li>
            <li>iOS web app client development (Swift)</li>
            <li>
              Map Visualization (D3, Leaflet.js, Google Fusion Table, etc.)
            </li>
          </ul>

          <h4 id="intern-developer-company-100-october-2013--january-2014">
            Intern Developer,{" "}
            <a href="https://www.crunchbase.com/organization/company100">
              Company 100
            </a>{" "}
            <sub className="sub-date">October 2013 – January 2014</sub>
          </h4>
          <ul>
            <li>Developed high-performance UI prototypes using Greensock.js</li>
          </ul>

          <h4 id="freelancer-october-2011--october-2013">
            Freelancer
            <sub className="sub-date">2011 – October 2013</sub>
          </h4>
          <ul>
            <li>
              Designed and Developed WordPress-based portfolio homepages and
              corporate content management system
              <ul>
                <li>
                  <a href="http://www.storyb.kr">http://www.storyb.kr/</a>
                </li>
                <li>
                  <a href="http://www.hongiksidi.com/2012">
                    http://www.hongiksidi.com/2012/
                  </a>
                </li>
              </ul>
            </li>
          </ul>

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

          <h3 id="education">Education</h3>
          <ul className="education-list">
            <li>
              Bachelor of Fine Arts, Visual Communication Design, Hongik
              University{" "}
              <sub className="sub-date">March 2006 - Febraury 2012</sub>
            </li>
            <li>
              Bachelor of Science, Computer Science, Korean National Open
              University{" "}
              <sub className="sub-date">March 2014 - Febraury 2016</sub>
            </li>
          </ul>

          <h3 id="open-source-contributions">Open Source Contributions</h3>

          <ul>
            <li>
              <a href="https://github.com/facebook/react">facebook/react</a>{" "}
              <a href="https://github.com/facebook/react/pull/3240">#3240</a>{" "}
              (translations)
            </li>
            <li>
              <a href="https://github.com/reflux/refluxjs">spoike/reflux</a>{" "}
              <a href="https://github.com/reflux/refluxjs/commit/5a5e6d81a88cabc5e65bce58fded77883ac27bcf">
                #371
              </a>{" "}
              (bugfix)
            </li>
            <li>
              <a href="https://github.com/nodejs/io.js">iojs/iojs</a>{" "}
              <a href="https://github.com/nodejs/io.js/pull/494">#494</a>{" "}
              (bugfix)
            </li>
            <li>
              <a href="https://github.com/RazrFalcon/svgcleaner">
                RazrFalcon/svgcleaner
              </a>{" "}
              <a href="https://github.com/RazrFalcon/svgcleaner/pull/79">#79</a>{" "}
              (add feature)
            </li>
          </ul>

          <h3 id="personal-projects">Personal Projects</h3>

          <ul>
            <li>
              <a href="https://github.com/webpack-contrib/svg-inline-loader">
                webpack-contrib/svg-inline-loader (merged into webpack-contrib)
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

          <h3 id="language">Language</h3>

          <p>Native Korean, Fluent English, Basic Japanese</p>

          <h3 id="interests">Interests</h3>

          <p>
            Web browser, EcmaScript, Data visualization, Developer tools, Open
            source
          </p>

          <h3 id="featured-articles">Featured Articles</h3>
          <ul>
            <li>
              <a href="https://spoqa.github.io/2015/05/14/living-on-the-edge.html">
                Living on The Edge: 가장 앞에서 개발 (다시) 시작하기
              </a>{" "}
              (Living on The Edge: Rewriting app on the cutting edge)
            </li>
          </ul>

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
