import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode } = useColorMode();
  console.log(colorMode)

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner) + clsx({ ' hero--dark': colorMode === "dark" })}>
      <div className="container">
        <h1 className="hero__title text--secondary">{siteConfig.title}</h1>
        <div className={"row"} style={{ justifyContent: "center" }}>
          <img className={"col col--2"} src={siteConfig.favicon} style={{ maxWidth: "50%" }} />
        </div>
        <p className="hero__subtitle text--secondary text--semibold">{siteConfig.tagline}</p>
        <div className={styles.buttons + " row"}>
          <div className={clsx('col col--4')}>
            <Link
              className="button button--secondary button--lg"
              to="/docs">
              JS/TS Client
            </Link>
          </div>
          <div className={clsx('col col--4 margin-top--md')}>
            <Link
              className="button button--secondary button--lg"
              to="pathname:///asyncapi">
              WebSocket Docs
            </Link>
          </div>
          <div className={clsx('col col--4 margin-top--md')}>
            <Link
              className="button button--secondary button--lg"
              to="https://newsware.readme.io/">
              REST Docs
            </Link>
          </div>
          <div className={clsx('col col--4 margin-top--md')}>
            <Link
              className="button button--secondary button--lg"
              to="pathname:///category-codes">
              Category codes
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
    </Layout>
  );
}
