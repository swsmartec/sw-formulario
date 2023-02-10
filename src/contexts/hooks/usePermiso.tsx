import {
  apiPermisoCreate,
  apiPermisoDelete,
  apiPermisoList,
  apiPermisoUpdate
} from 'constants/api';
import { del, get, post, put } from 'helpers/service';
import { replaceObjectInString } from 'helpers/Utils';
import React, { useState } from 'react';
import { IPermiso, IPermisoState } from 'interfaces/Permiso';

export const usePermiso = () => {
  const [
    { loading, listResult, selectedResult, isNew, isEdit, isDelete },
    setStateHooks
  ] = useState<IPermisoState>({
    loading: true,
    listResult: [] as IPermiso[],
    selectedResult: {} as IPermiso,
    isNew: false,
    isEdit: false,
    isDelete: false
  });

  const getList = React.useCallback(() => {
    setStateHooks((prev) => ({ ...prev, loading: true }));
    get(apiPermisoList)
      .then((res) => {
        setStateHooks((prev) => ({ ...prev, listResult: res as IPermiso[] }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setStateHooks((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  React.useEffect(() => {
    getList();
  }, []);

  const setListResult = (v: IPermiso[]) => {
    setStateHooks((prev) => {
      return { ...prev, listResult: v };
    });
  };

  const setCurrentResult = (result: IPermiso) => {
    setStateHooks((prev) => {
      return { ...prev, selectedResult: result };
    });
  };

  const changeNew = (state: boolean) => {
    setStateHooks((prev) => {
      return { ...prev, isNew: state };
    });
  };

  const transformDataNew = (data: IPermiso) => {
    const { Nombre, Codigo, Acciones } = data;
    return {
      Nombre,
      Codigo,
      Acciones
    };
  };

  const createRegister = (data: IPermiso) => {
    const dataSend = transformDataNew(data);
    post(apiPermisoCreate, dataSend)
      .then((res) => {
        const newRegister: IPermiso = { ...res };
        let newListResult: IPermiso[] = listResult;
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

  const transformDataUpdate = (data: IPermiso) => {
    const { RolId, Nombre, Codigo, Acciones } = data;
    return {
      RolId,
      Nombre,
      Codigo,
      Acciones
    };
  };

  const updateRegister = (data: IPermiso) => {
    const dataSend = transformDataUpdate(data);
    let urlSite = replaceObjectInString(apiPermisoUpdate, {
      id: dataSend.RolId
    });
    put(urlSite, dataSend)
      .then((res) => {
        const result: IPermiso = { ...res };
        const newListResult = listResult.map((register: IPermiso) =>
          register.RolId === dataSend.RolId
            ? { ...register, ...dataSend, RolesAciones: result.RolesAciones }
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
    let urlSite = replaceObjectInString(apiPermisoDelete, { id });
    del(urlSite)
      .then(() => {
        const newListResult = listResult.filter(
          (register: IPermiso) => register.RolId !== id
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
