import React from 'react';
import Layout from '@theme/Layout';
import HomepageHeader from "../components/HomepageHeader";
import HomepageExample from "../components/HomepageExample";
import HomepageSponsors from "../components/HomepageSponsors";

export default function Home() {
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <HomepageExample />
        <HomepageSponsors />
      </main>
    </Layout>
  );
}
