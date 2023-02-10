import {
  apiCatalogoCreate,
  apiCatalogoDelete,
  apiCatalogoList,
  apiCatalogoUpdate
} from 'constants/api';
import { del, get, post, put } from 'helpers/service';
import { replaceObjectInString } from 'helpers/Utils';
import { ICatalogo, ICatalogoState } from 'interfaces/Catalogo';
import React, { useState } from 'react';

export const useCatalogo = () => {
  const [
    { loading, listResult, selectedResult, isNew, isEdit, isDelete },
    setStateHooks
  ] = useState<ICatalogoState>({
    loading: true,
    listResult: [] as ICatalogo[],
    selectedResult: {} as ICatalogo,
    isNew: false,
    isEdit: false,
    isDelete: false
  });

  const getCatalogo = React.useCallback(() => {
    setStateHooks((prev) => ({ ...prev, loading: true }));
    get(apiCatalogoList)
      .then((res) => {
        console.log('hooks', res);
        setStateHooks((prev) => ({ ...prev, listResult: res as ICatalogo[] }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setStateHooks((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  React.useEffect(() => {
    getCatalogo();
  }, []);

  const setListResult = (v: ICatalogo[]) => {
    setStateHooks((prev) => {
      return { ...prev, listResult: v };
    });
  };

  const setCurrentResult = (result: ICatalogo) => {
    setStateHooks((prev) => {
      return { ...prev, selectedResult: result };
    });
  };

  const changeNew = (state: boolean) => {
    setStateHooks((prev) => {
      return { ...prev, isNew: state };
    });
  };

  const transformDataNew = (data: ICatalogo) => {
    const { Nombre, Valor, Ambito, Descripcion } = data;
    return {
      Nombre,
      Valor,
      Ambito,
      Descripcion
    };
  };

  const createRegister = (data: ICatalogo) => {
    const dataSend = transformDataNew(data);
    post(apiCatalogoCreate, dataSend)
      .then((res) => {
        const newRegister: ICatalogo = { ...res };
        let newListResult: ICatalogo[] = listResult;
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

  const transformDataUpdate = (data: ICatalogo) => {
    const { ListaSeleccionId, Nombre, Valor, Ambito, Descripcion } = data;
    return {
      ListaSeleccionId,
      Nombre,
      Valor,
      Ambito,
      Descripcion
    };
  };

  const updateRegister = (data: ICatalogo) => {
    const dataSend = transformDataUpdate(data);
    let urlSite = replaceObjectInString(apiCatalogoUpdate, {
      id: dataSend.ListaSeleccionId
    });
    put(urlSite, dataSend)
      .then(() => {
        const newListResult = listResult.map((register: ICatalogo) =>
          register.ListaSeleccionId === dataSend.ListaSeleccionId
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
    let urlSite = replaceObjectInString(apiCatalogoDelete, { id });
    del(urlSite)
      .then(() => {
        const newListResult = listResult.filter(
          (register: ICatalogo) => register.ListaSeleccionId !== id
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
