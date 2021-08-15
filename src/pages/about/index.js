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
      <h5 className="inner-subtitle">요약</h5>
      <ul>{children}</ul>
    </div>
  )
}

const Projects = ({ children }) => {
  return (
    <div>
      <h5 className="inner-subtitle">프로젝트</h5>
      <ul>{children}</ul>
    </div>
  )
}

const Experiences = ({ children }) => {
  return (
    <div>
      <h5 className="inner-subtitle">기술 경험</h5>
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
          <Section title="저의 강점">
            <ul>
              <li>
                <strong>모던 웹 개발 전문가</strong>
                <br />
                <p>
                  jQuery 기반 레거시 웹앱부터, ES2015와 타입스크립트, 웹팩,
                  리액트 등을 사용한 SPA 등 모던 웹 개발에 있어 많은 경험이 있는
                  전문가입니다.
                </p>
              </li>
              <li>
                <strong>빠른 학습능력</strong>
                <br />
                <p>
                  처음 겪어보는 문제나 학습이 필요한 일들도 높은 집중력으로
                  빠르게 해결할 수 있습니다.
                </p>
              </li>
              <li>
                <strong>빠른 프로토타이핑 능력</strong>
                <br />
                <p>
                  웹 디자이너로 일했던 경험을 살려, 제가 가진 빠른 프로토타이핑
                  기술로 불분명한 요구사항도 사용자가 사용할 수 있는 수준으로
                  빠르게 개발할 수 있습니다.
                </p>
              </li>
            </ul>
          </Section>

          <Section title="경력">
            <CareerItem
              title="소프트웨어 엔지니어"
              companyName="넥스클라우드"
              homepage="https://www.nexcloud.co.kr"
              duration="2021년 1월 – 현재"
            >
              <Summary>
                <li>
                  시니어 프론트엔드 개발자의 역할을 맡아,{" "}
                  <a href="https://nexclipper.github.io">넥스클리퍼</a>{" "}
                  프로메테우스 웹 콘솔 개발 프로젝트를 개발하고 있습니다.
                </li>
              </Summary>
              <Projects>
                <li>
                  Redux 기반 기존 레거시 프로젝트의 SPA 앱 구조를 현대적인 React
                  hook 기반으로 개선하여 유지보수와 변경에 용이하도록 수정하고,
                  주니어 개발자들을 교육하고 코드리뷰 등을 진행하였습니다.
                </li>
                <li>
                  다양한 사내 부가 콘솔 프로젝트들의 프로토타입을 개발하고, 공용
                  컴포넌트들을 개발하였으며, 고객사들의 다양한 요구에 맞추기
                  위해 다변화된 솔루션을 제공해야 하는 문제로 Yarn Berry 등의
                  모노리포 솔루션을 도입하였습니다.
                </li>
              </Projects>
            </CareerItem>

            <CareerItem
              title="프로덕트 엔지니어"
              companyName="한국신용데이터"
              homepage="https://kcd.co.kr"
              duration="2019년 11월  – 2020년 9월"
            >
              <Summary>
                <li>
                  매출 및 사업 관리 솔루션{" "}
                  <a href="https://cashnote.kr">캐시노트</a> 앱 개발
                </li>
              </Summary>
              <Projects>
                <li>오픈뱅킹 API를 이용한 소액 송금 기능 프론트엔드 개발</li>
                <li>코로나 정부 지원 알아보기 개발</li>
                <li>
                  신용점수 조회 API를 이용한 노란우산 공제 신청 페이지 개발
                </li>
                <li>부가세 신고 기능 개발</li>
              </Projects>
              <Experiences>
                <li>
                  아폴로 GraphQL을 이용한 앱개발과 타입 자동 생성 도구 등 도입
                </li>
                <li>자바스크립트 코드베이스에서 점진적 타입스크립트 도입</li>
                <li>Puppeteer 등을 이용한 자동화 도구 개발</li>
                <li>
                  웹앱 기반 앱을 개발하기 위한 앱과의 통신, 디버깅 등의 경험
                </li>
              </Experiences>
            </CareerItem>

            <CareerItem
              title="Software Engineer"
              companyName="Fancy.com (Thing Daemon Inc.)"
              homepage="https://www.fancy.com"
              duration="2015년 10월 – 2019년 11월"
            >
              <Summary>
                <li>
                  리모트로 뉴욕 본사에 있는 Fancy.com 서비스의 웹 프론트엔드 및
                  백엔드 개발, 백오피스 개발을 담당하였습니다.
                </li>
              </Summary>
              <Projects>
                <li>
                  레거시 쟝고 웹 앱을 React를 사용 기존 상품화면 재구현 및
                  상품화면 표시에 필요한 API 개발
                </li>
                <li>위치 기반 실시간 사용자 쇼핑 중 화면 개발</li>
                <li>아이템 저장 및 Like 기능 개발</li>
                <li>상품 반품을 위한 고객 대면 화면과 백오피스, API 등 개발</li>
                <li>D3를 활용한 백오피스에서의 매출 차트 개발</li>
                <li>
                  블로깅을 위한 오픈 소스(medium-editor)를 활용한 medium-like
                  에디터 개발
                </li>
                <li>샵인샵 개발</li>
              </Projects>
              <Experiences>
                <li>
                  Webpack을 활용한 멀티빌드 환경 구성, 청크 스플리팅 등 다양한
                  웹 성능 개선 및 로깅, 레거시 앱 리팩터링, 타입스크립트 도입 등
                  작업
                </li>
              </Experiences>
            </CareerItem>

            <CareerItem
              title="소프트웨어 엔지니어"
              companyName="주식회사 스포카"
              homepage="https://www.spoqa.com"
              duration="2014년 3월 – 2015년 10월"
            >
              <Summary>
                웹 프론트엔드에 강점을 가진 풀스택 개발자로서 도도포인트 서비스
                전반 개발에 참여
              </Summary>
              <Projects>
                <li>
                  도도포인트 타블렛 웹앱 프론트엔드, 백오피스 및 백엔드 API 개발
                </li>
                <li>
                  도도포인트 랜딩 페이지 (https://dodopoint.com) 개발 -
                  광고키워드 개선, SEO 개선, 사용자 이용 동선 트래킹 등 growth
                  hack을 통해서 전환율을 3배 이상 향상시키는 성과 달성
                </li>
                <li>공용 자바스크립트 컴포넌트 및 라이브러리 구현</li>
              </Projects>
              <Experiences>
                <li>Flask, SQLAlchemy, PostgreSQL</li>
                <li>Leaflet, D3, Mapbox 등을 이용한 지도 상 노드 시각화</li>
                <li>국제화 경험</li>
                <li>React, Reflux, ES2015+</li>
                <li>Flask, SQLAlchemy</li>
                <li>인테그레이션, 기능 테스트 (Python-Selenium, Pytest)</li>
              </Experiences>
            </CareerItem>

            <CareerItem
              title="개발자 인턴"
              companyName="컴퍼니 원헌드레드"
              homepage="https://www.crunchbase.com/organization/company100"
              duration="2013년 10월 – 2014년 1월"
            >
              <Summary>
                <li>Greensock을 이용한 정부 과제 프로토타입 제작</li>
              </Summary>
            </CareerItem>
          </Section>

          <Section title="기술과 경험">
            <ul>
              <li>
                Webpack, ES2015/TypeScript, React 기반 SPA 프로젝트를 주도적으로
                세팅/개발한 경험
              </li>
              <li>풍부한 크로스 웹 브라우징 및 테스팅 경험</li>
              <li>다양한 고객 대면 앱 개발과 백오피스/콘솔 개발 경험</li>
              <li>
                파이썬과 Node 기반 백엔드 프로그래밍, 커맨드라인 툴링 개발 경험
              </li>
              <li>웹 디자인 경험</li>
            </ul>
          </Section>

          <Section title="교육">
            <ul className="education-list">
              <li>
                홍익대학교 시각디자인 학사
                <sub className="sub-date">2006년 3월 - 2012년 2월</sub>
              </li>
              <li>
                한국방송통신대학교 컴퓨터과학과 학사 (학사편입){" "}
                <sub className="sub-date">2014년 3월 - 2016년 2월</sub>
              </li>
            </ul>
          </Section>

          <Section title="오픈소스 작업과 기여">
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

              <br />
              <span>기여</span>

              <li>
                <a href="https://github.com/facebook/react">facebook/react</a>{" "}
                <a href="https://github.com/facebook/react/pull/3240">#3240</a>{" "}
                (번역)
              </li>
              <li>
                <a href="https://github.com/reflux/refluxjs">spoike/reflux</a>{" "}
                <a href="https://github.com/reflux/refluxjs/commit/5a5e6d81a88cabc5e65bce58fded77883ac27bcf">
                  #371
                </a>{" "}
                (버그 수정)
              </li>
              <li>
                <a href="https://github.com/nodejs/node">nodejs/node</a>{" "}
                <a href="https://github.com/nodejs/node/pull/494">#494</a> (버그
                수정)
              </li>
              <li>
                <a href="https://github.com/RazrFalcon/svgcleaner">
                  RazrFalcon/svgcleaner
                </a>{" "}
                <a href="https://github.com/RazrFalcon/svgcleaner/pull/79">
                  #79
                </a>{" "}
                (기능 추가)
              </li>
            </ul>
          </Section>

          <Section title="언어 능력">
            <p>
              업무에 있어 영어로 충분한 소통이 가능하며 영어만 사용하는 환경에서
              불편함을 느끼지 않을 정도입니다.
            </p>
          </Section>

          <Section title="관심사">
            <p>오픈 소스, 데이터 시각화, 웹 개발을 위한 툴링</p>
          </Section>

          <Section title="저술">
            <ul>
              <li>
                <a href="https://spoqa.github.io/2015/05/14/living-on-the-edge.html">
                  Living on The Edge: 가장 앞에서 개발 (다시) 시작하기
                </a>{" "}
                (Living on The Edge: Rewriting app on the cutting edge)
              </li>
            </ul>
          </Section>

          <Section title="연락">
            <ul>
              <li>
                <a href="https://www.linkedin.com/profile/view?id=102091444">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:me@jaeholee.org">me@jaeholee.org</a>
              </li>
              <li>언제나 다양한 기회에 열려 있습니다.</li>
            </ul>
          </Section>
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
