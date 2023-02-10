import {
  apiCiudadanoCreate,
  apiCiudadanoDelete,
  apiCiudadanoList,
  apiCiudadanoUpdate
} from 'constants/api';
import { del, get, post, put } from 'helpers/service';
import { replaceObjectInString } from 'helpers/Utils';
import { ICiudadano, ICiudadanoState } from 'interfaces/Ciudadano';
import React, { useState } from 'react';

export const useCiudadano = () => {
  const [
    { loading, listResult, selectedResult, isNew, isEdit, isDelete },
    setStateHooks
  ] = useState<ICiudadanoState>({
    loading: true,
    listResult: [] as ICiudadano[],
    selectedResult: {} as ICiudadano,
    isNew: false,
    isEdit: false,
    isDelete: false
  });

  const getCiudadano = React.useCallback(() => {
    setStateHooks((prev) => ({ ...prev, loading: true }));
    get(apiCiudadanoList)
      .then((res) => {
        console.log('hooks', res);
        setStateHooks((prev) => ({ ...prev, listResult: res as ICiudadano[] }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setStateHooks((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  React.useEffect(() => {
    getCiudadano();
  }, []);

  const setListResult = (v: ICiudadano[]) => {
    setStateHooks((prev) => {
      return { ...prev, listResult: v };
    });
  };

  const setCurrentResult = (result: ICiudadano) => {
    setStateHooks((prev) => {
      return { ...prev, selectedResult: result };
    });
  };

  const changeNew = (state: boolean) => {
    setStateHooks((prev) => {
      return { ...prev, isNew: state };
    });
  };

  const transformDataNew = (data: ICiudadano) => {
    const {
      CondicionCedulado,
      NumeroCedula,
      Apellidos,
      Nombres,
      Nacionalidad,
      EstadoCivil,
      Conyuge,
      ProfesionOcupacion,
      Direccion,
      Genero,
      LugarNacimiento,
      FechaMatrimonio,
      FechaDefuncion
    } = data;
    return {
      CondicionCedulado,
      NumeroCedula,
      Apellidos,
      Nombres,
      Nacionalidad,
      EstadoCivil,
      Conyuge,
      ProfesionOcupacion,
      Direccion,
      Genero,
      LugarNacimiento,
      FechaMatrimonio,
      FechaDefuncion
    };
  };

  const createRegister = (data: ICiudadano) => {
    const dataSend = transformDataNew(data);
    post(apiCiudadanoCreate, dataSend)
      .then((res) => {
        const newRegister: ICiudadano = { ...res };
        let newListResult: ICiudadano[] = listResult;
        newListResult.push(newRegister);
        setListResult(newListResult);
        changeNew(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeEdit = (state: boolean) => {
    setStateHooks((prev) => {
      return { ...prev, isEdit: state };
    });
  };

  const transformDataUpdate = (data: ICiudadano) => {
    const {
      CiudadanoId,
      CondicionCedulado,
      NumeroCedula,
      Apellidos,
      Nombres,
      Nacionalidad,
      EstadoCivil,
      Conyuge,
      ProfesionOcupacion,
      Direccion,
      Genero,
      LugarNacimiento,
      FechaMatrimonio,
      FechaDefuncion
    } = data;
    return {
      CiudadanoId,
      CondicionCedulado,
      NumeroCedula,
      Apellidos,
      Nombres,
      Nacionalidad,
      EstadoCivil,
      Conyuge,
      ProfesionOcupacion,
      Direccion,
      Genero,
      LugarNacimiento,
      FechaMatrimonio,
      FechaDefuncion
    };
  };

  const updateRegister = (data: ICiudadano) => {
    const dataSend = transformDataUpdate(data);
    let urlSite = replaceObjectInString(apiCiudadanoUpdate, {
      id: dataSend.CiudadanoId
    });
    put(urlSite, dataSend)
      .then(() => {
        const newListResult = listResult.map((register: ICiudadano) =>
          register.CiudadanoId === dataSend.CiudadanoId
            ? { ...register, ...dataSend }
            : register
        );
        setListResult(newListResult);
        changeEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeDelete = (state: boolean) => {
    setStateHooks((prev) => {
      return { ...prev, isDelete: state };
    });
  };

  const deleteRegister = (id: number) => {
    let urlSite = replaceObjectInString(apiCiudadanoDelete, { id });
    del(urlSite)
      .then(() => {
        const newListResult = listResult.filter(
          (register: ICiudadano) => register.CiudadanoId !== id
        );
        setListResult(newListResult);
        changeDelete(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    loading,
    listResult,
    selectedResult,
    isNew,
    isEdit,
    isDelete,

    setCurrentResult,
    changeNew,
    createRegister,
    changeEdit,
    updateRegister,
    changeDelete,
    deleteRegister
  };
};
