import LegalForm from '@/content/LegalForm/index';
import { formInitialValues } from '@/content/LegalForm/Model';
import { Box, styled } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import type { ReactElement } from 'react';
import React from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import styles from '../../../styles/Home.module.css';

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const keyStorage = 'legal_person';

  return (
    <OverviewWrapper>
      <Head>
        <title>Picaval</title>
        <meta name="description" content="Formulario de clientes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className="container">
          <div className="top">
            <Link href={'/'}>
              <div className="logo">
                <img
                  src={
                    require('../../../assets/images/logo-picaval.png').default
                  }
                  alt="Logo"
                />
              </div>
            </Link>
            <div className="txt01">
              formulario <span>en línea</span>
            </div>
          </div>
          <LegalForm keyStorage={keyStorage} valuesForm={formInitialValues} />
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
