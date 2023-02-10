import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import GridCatalogo from '@/content/Management/Catalogo/GridCatalogo';
import HeaderCatalogo from '@/content/Management/Catalogo/HeaderCatalogo';
import { CatalogoProvider } from '@/contexts/CatalogoContext';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Card, Container, Grid } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { Config } from '../../../constants/default';

function View() {
  return (
    <CatalogoProvider>
      <Head>
        <title>Catálogo :: {Config.TitleSite}</title>
      </Head>
      <PageTitleWrapper>
        <HeaderCatalogo />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <GridCatalogo />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </CatalogoProvider>
  );
}

View.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default View;
