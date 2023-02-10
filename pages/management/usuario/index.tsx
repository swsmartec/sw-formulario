import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import GridUsuario from '@/content/Management/Usuario/GridUsuario';
import HeaderUsuario from '@/content/Management/Usuario/HeaderUsuario';
import { UsuarioProvider } from '@/contexts/UsuarioContext';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Card, Container, Grid } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { Config } from '../../../constants/default';

function View() {
  return (
    <UsuarioProvider>
      <Head>
        <title>Usuarios :: {Config.TitleSite}</title>
      </Head>
      <PageTitleWrapper>
        <HeaderUsuario />
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
              <GridUsuario />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </UsuarioProvider>
  );
}

View.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default View;
