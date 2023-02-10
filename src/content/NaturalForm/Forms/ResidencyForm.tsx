import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';
import {
  apiCatalogList,
  apiCatalogListByParentId,
  apiCatalogListDocument
} from '../../../../constants/api';
import { Catalog } from '../../../../constants/default';
import { post } from '../../../../helpers/service';
import { BaseFormProps } from '../../../../interfaces/forms';
import { InputField, SelectField } from '../../../components/FormFields';

interface IExternalData {
  listCountry: any[];
  listProvince: any[];
  listCanton: any[];
}

export const ResidencyForm = (props: BaseFormProps) => {
  const {
    formField: {
      representative,
      country,
      province,
      canton,
      landline,
      address,
      residence,
      countryRepresentative,
      provinceRepresentative,
      cantonRepresentative,
      landlineRepresentative,
      addressRepresentative,
      residenceRepresentative,
      files
    },
    handleUpdateForm
  } = props;

  const { values } = useFormikContext<any>();
  const [externalData, setExternalData] = React.useState<IExternalData>({
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
    let codigo = Catalog.CodeTipoDocumentoPN;
    if (values.representative) {
      codigo = Catalog.CodeTipoDocumentoPNA;
    }
    post(apiCatalogListDocument, { Codigo: codigo })
      .then((resp) => {
        let valueFile = null;
        values[files.name] = resp.map((fil) => {
          if (values[files.name] && values[files.name].length > 0) {
            let findFile = values[files.name].filter(
              (file) => file.fileName == fil.DOC_NOMBRE
            );
            if (findFile.length > 0) {
              valueFile = findFile[0].file;
            }
          }
          return { fileName: fil.DOC_NOMBRE.toUpperCase(), file: valueFile };
        });
      })
      .catch((e) => console.log(e));
  }, []);

  React.useEffect(() => {
    handleUpdateForm(values);
  }, [values]);

  React.useEffect(() => {
    let countryId = values[country.name];
    post(apiCatalogListByParentId, { Codigo: countryId }).then((resp) => {
      console.log(resp);
      let listProvince = JSON.parse(resp);
      setExternalData({ ...externalData, listProvince });
    });
  }, [values[country.name]]);

  React.useEffect(() => {
    let provinceId = values[province.name];
    post(apiCatalogListByParentId, { Codigo: provinceId }).then((resp) => {
      let listCanton = JSON.parse(resp);
      setExternalData({ ...externalData, listCanton });
    });
  }, [values[province.name]]);

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
          <InputField
            name={address.name}
            label={address.label}
            help={address.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField name={landline.name} label={landline.label} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectField
            name={residence.name}
            label={residence.label}
            options={externalData.listCountry}
            itemKey={'ITC_ID'}
            itemLabel={'ITC_NOMBRE'}
            help={residence.name}
          />
        </Grid>
      </Grid>
      {values[representative.name] && (
        <>
          <div className="titleContent">Representante legal apoderado</div>
          <Grid container spacing={1} className={'colContainer'}>
            <Grid item xs={12} md={4}>
              <SelectField
                name={countryRepresentative.name}
                label={countryRepresentative.label}
                options={externalData.listCountry}
                itemKey={'ITC_ID'}
                itemLabel={'ITC_NOMBRE'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SelectField
                name={provinceRepresentative.name}
                label={provinceRepresentative.label}
                options={externalData.listProvince}
                itemKey={'ITC_ID'}
                itemLabel={'ITC_NOMBRE'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SelectField
                name={cantonRepresentative.name}
                label={cantonRepresentative.label}
                options={externalData.listCanton}
                itemKey={'ITC_ID'}
                itemLabel={'ITC_NOMBRE'}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <InputField
                name={addressRepresentative.name}
                label={addressRepresentative.label}
                helptext={address.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                name={landlineRepresentative.name}
                label={landlineRepresentative.label}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectField
                name={residenceRepresentative.name}
                label={residenceRepresentative.label}
                options={externalData.listCountry}
                itemKey={'ITC_ID'}
                itemLabel={'ITC_NOMBRE'}
              />
            </Grid>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
};

export default ResidencyForm;
