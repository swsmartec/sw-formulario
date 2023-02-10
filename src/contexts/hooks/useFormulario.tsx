import {
  apiFormularioCreate,
  apiFormularioDelete,
  apiFormularioList,
  apiFormularioUpdate
} from 'constants/api';
import { del, get, post, put } from 'helpers/service';
import { replaceObjectInString } from 'helpers/Utils';
import { IFormulario, IFormularioState } from 'interfaces/Formulario';
import React, { useState } from 'react';
import { ICatalogoService } from '../../../interfaces/Catalogo';

export const useFormulario = () => {
  const [
    {
      loading,
      listResult,
      selectedResult,
      listCatalogoServicio,
      isNew,
      isEdit,
      isDelete,
      isList
    },
    setStateHooks
  ] = useState<IFormularioState>({
    loading: true,
    listResult: [] as IFormulario[],
    selectedResult: {} as IFormulario,
    listCatalogoServicio: [] as ICatalogoService[],
    isNew: false,
    isEdit: false,
    isDelete: false,
    isList: false
  });

  const getList = React.useCallback(() => {
    setStateHooks((prev) => ({ ...prev, loading: true }));
    get(apiFormularioList)
      .then((res) => {
        console.log('hooks', res);
        setStateHooks((prev) => ({
          ...prev,
          listResult: res as IFormulario[]
        }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setStateHooks((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  React.useEffect(() => {
    if (isList) {
      getList();
    }
  }, [isList]);

  const setListResult = (v: IFormulario[]) => {
    setStateHooks((prev) => {
      return { ...prev, listResult: v };
    });
  };

  const setListCatalogo = (result: ICatalogoService[]) => {
    setStateHooks((prev) => {
      return { ...prev, listCatalogoServicio: result };
    });
  };

  const setCurrentResult = (result: IFormulario) => {
    setStateHooks((prev) => {
      return { ...prev, selectedResult: result };
    });
  };

  const changeNew = (state: boolean) => {
    setStateHooks((prev) => {
      return { ...prev, isNew: state };
    });
  };

  const transformDataNew = (data: IFormulario) => {
    const {
      Identificacion,
      RazonSocial,
      DetalleFormulario,
      Estado,
      TipoFormulario
    } = data;
    return {
      Identificacion,
      RazonSocial,
      DetalleFormulario,
      EstadoId: Estado.ListaSeleccionId,
      TipoFormularioId: TipoFormulario.ListaSeleccionId
    };
  };

  const createRegister = (data: IFormulario) => {
    const dataSend = transformDataNew(data);
    post(apiFormularioCreate, dataSend)
      .then((res) => {
        const newRegister: IFormulario = { ...res };
        let newListResult: IFormulario[] = listResult;
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

  const transformDataUpdate = (data: IFormulario) => {
    const {
      FormularioId,
      Identificacion,
      RazonSocial,
      DetalleFormulario,
      Estado,
      TipoFormulario
    } = data;
    return {
      FormularioId,
      EstadoId: Estado.ListaSeleccionId,
      TipoFormularioId: TipoFormulario.ListaSeleccionId,
      Identificacion,
      RazonSocial,
      DetalleFormulario
    };
  };

  const updateRegister = (data: IFormulario) => {
    const dataSend = transformDataUpdate(data);
    let urlSite = replaceObjectInString(apiFormularioUpdate, {
      id: dataSend.FormularioId
    });
    put(urlSite, dataSend)
      .then(() => {
        const newListResult = listResult.map((register: IFormulario) =>
          register.FormularioId === dataSend.FormularioId
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
    let urlSite = replaceObjectInString(apiFormularioDelete, { id });
    del(urlSite)
      .then(() => {
        const newListResult = listResult.filter(
          (register: IFormulario) => register.FormularioId !== id
        );
        setListResult(newListResult);
        changeDelete(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeList = (state: boolean) => {
    setStateHooks((prev) => {
      return { ...prev, isList: state };
    });
  };

  return {
    loading,
    listResult,
    selectedResult,
    listCatalogoServicio,
    isNew,
    isEdit,
    isDelete,
    isList,

    setCurrentResult,
    setListCatalogo,
    changeNew,
    createRegister,
    changeEdit,
    updateRegister,
    changeDelete,
    deleteRegister,
    changeList
  };
};
