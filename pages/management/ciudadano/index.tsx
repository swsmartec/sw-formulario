import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import GridCiudadano from '@/content/Management/Ciudadano/GridCiudadano';
import HeaderCiudadano from '@/content/Management/Ciudadano/HeaderCiudadano';
import { CiudadanoProvider } from '@/contexts/CiudadanoContext';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Card, Container, Grid } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { Config } from '../../../constants/default';

function View() {
  return (
    <CiudadanoProvider>
      <Head>
        <title>Ciudadano :: {Config.TitleSite}</title>
      </Head>
      <PageTitleWrapper>
        <HeaderCiudadano />
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
              <GridCiudadano />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </CiudadanoProvider>
  );
}

View.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default View;
