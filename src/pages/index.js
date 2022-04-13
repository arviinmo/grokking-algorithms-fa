import React from 'react';
import Layout from '@theme/Layout';
import HomepageHeader from "../components/HomepageHeader";
import HomepageSponsors from "../components/HomepageSponsors";

export default function Home() {
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <HomepageSponsors />
      </main>
    </Layout>
  );
}
