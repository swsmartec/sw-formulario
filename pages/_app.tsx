import { CacheProvider, EmotionCache } from '@emotion/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import createEmotionCache from 'src/createEmotionCache';
import ThemeProvider from 'src/theme/ThemeProvider';
import { AuthProvider, ProtectRoute } from '@/contexts/AuthContext';
import '../assets/css/home.css';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface PicavalAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function PicavalApp(props: PicavalAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <CacheProvider value={emotionCache}>
      <AuthProvider>
        <ProtectRoute>
          <Head>
            <title>BVQ Picaval</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head>
          <SidebarProvider>
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
              </LocalizationProvider>
            </ThemeProvider>
          </SidebarProvider>
        </ProtectRoute>
      </AuthProvider>
    </CacheProvider>
  );
}

export default PicavalApp;
