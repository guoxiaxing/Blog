import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

function Homepage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles.heroBanner}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />"
    >
      <div className={styles.indexImg}>
        <img src={siteConfig.baseUrl + "img/logo.png"} alt="" />
      </div>
      <Homepage />
    </Layout>
  );
}
