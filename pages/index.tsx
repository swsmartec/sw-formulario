import HomeComponent from '@/content/HomeComponent';
import { Box, styled } from '@mui/material';
import Head from 'next/head';
import type { ReactElement } from 'react';
import React from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import styles from '../styles/Home.module.css';

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Head>
        <title>Incio | BVQ Picaval</title>
      </Head>
      <main className={styles.main}>
        <div className="container">
          <div className="top">
            <div className="logo">
              <img
                src={require('../assets/images/logo-picaval.png').default}
                alt="Logo"
              />
            </div>
            <div className="txt01">
              formulario <span>en línea</span>
            </div>
          </div>
          <HomeComponent />
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="https://picaval.com" target="_blank" rel="noopener noreferrer">
          Powered by{' BVQ-2022'}
          <span className={styles.logo}></span>
        </a>
      </footer>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
