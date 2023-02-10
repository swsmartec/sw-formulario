import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Card, Container, Grid } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { PermisoProvider } from '@/contexts/PermisoContext';
import GridPermiso from '@/content/Management/Permiso/GridPermiso';
import HeaderPermiso from '@/content/Management/Permiso/HeaderPermiso';
import { Config } from '../../../constants/default';

function View() {
  return (
    <PermisoProvider>
      <Head>
        <title>Roles :: {Config.TitleSite}</title>
      </Head>
      <PageTitleWrapper>
        <HeaderPermiso />
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
              <GridPermiso />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </PermisoProvider>
  );
}

View.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default View;
