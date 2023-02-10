import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';
import { apiCatalogList } from '../../../../constants/api';
import { Catalog } from '../../../../constants/default';
import { post } from '../../../../helpers/service';
import { BaseFormProps } from '../../../../interfaces/forms';
import { InputField, SelectField } from '../../../components/FormFields';

export const ResidencyForm = (props: BaseFormProps) => {
  const {
    formField: { country, province, canton, address, landline },
    handleUpdateForm
  } = props;

  const { values } = useFormikContext<any>();

  const [externalData, setExternalData] = React.useState<any>({
    listCountry: [],
    listProvince: [],
    listCanton: []
  });

  React.useEffect(() => {
    const getData = async () => {
      let listCountry: any[];
      let listProvince: any[];
      let listCanton: any[];
      const wsCountry = await post(apiCatalogList, {
        Codigo: Catalog.CodeCountry
      });
      const wsProvince = await post(apiCatalogList, {
        Codigo: Catalog.CodeProvince
      });
      const wsCanton = await post(apiCatalogList, {
        Codigo: Catalog.CodeCanton
      });
      listCountry = wsCountry[Catalog.CodeCountry];
      listProvince = wsProvince[Catalog.CodeProvince];
      listCanton = wsCanton[Catalog.CodeCanton];
      return { listCountry, listProvince, listCanton };
    };
    getData().then((resp) => {
      const { listCountry, listProvince, listCanton } = resp;
      setExternalData({ listCountry, listProvince, listCanton });
    });
  }, []);

  React.useEffect(() => {
    handleUpdateForm(values);
  }, [values]);

  return (
    <React.Fragment>
      <div className="titleContent">Información de Residencia</div>
      <p className="cstLine">Por favor llena los siguientes campos:</p>
      <Grid container spacing={1} className={'colContainer'}>
        <Grid item xs={12} md={4}>
          <SelectField
            name={country.name}
            label={country.label}
            options={externalData.listCountry}
            itemKey={'ITC_ID'}
            itemLabel={'ITC_NOMBRE'}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectField
            name={province.name}
            label={province.label}
            options={externalData.listProvince}
            itemKey={'ITC_ID'}
            itemLabel={'ITC_NOMBRE'}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectField
            name={canton.name}
            label={canton.label}
            options={externalData.listCanton}
            itemKey={'ITC_ID'}
            itemLabel={'ITC_NOMBRE'}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <InputField name={address.name} label={address.label} />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField name={landline.name} label={landline.label} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ResidencyForm;
