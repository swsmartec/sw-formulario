import {
  apiUsuarioCreate,
  apiUsuarioDelete,
  apiUsuarioList,
  apiUsuarioPasswordUpdate,
  apiUsuarioSignedUpdate,
  apiUsuarioUpdate
} from 'constants/api';
import { del, get, post, put } from 'helpers/service';
import { replaceObjectInString } from 'helpers/Utils';
import { IUsuario, IUsuarioState } from 'interfaces/Usuario';
import React, { useState } from 'react';

export const useUsuario = () => {
  const [
    {
      loading,
      listResult,
      selectedResult,
      isNew,
      isEdit,
      isDelete,
      isPassword,
      isSigned
    },
    setStateHooks
  ] = useState<IUsuarioState>({
    loading: true,
    listResult: [] as IUsuario[],
    selectedResult: {} as IUsuario,
    isNew: false,
    isEdit: false,
    isDelete: false,
    isPassword: false,
    isSigned: false
  });

  const getUsuario = React.useCallback(() => {
    setStateHooks((prev) => ({ ...prev, loading: true }));
    get(apiUsuarioList)
      .then((res) => {
        console.log('hooks', res);
        setStateHooks((prev) => ({ ...prev, listResult: res as IUsuario[] }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setStateHooks((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  React.useEffect(() => {
    getUsuario();
  }, []);

  const setListResult = (v: IUsuario[]) => {
    setStateHooks((prev) => {
      return { ...prev, listResult: v };
    });
  };

  const setCurrentResult = (result: IUsuario) => {
    setStateHooks((prev) => {
      return { ...prev, selectedResult: result };
    });
  };

  const changeNew = (state: boolean) => {
    setStateHooks((prev) => {
      return { ...prev, isNew: state };
    });
  };

  const transformDataNew = (data: IUsuario) => {
    const {
      NombresCompletos,
      NombreUsuario,
      Clave,
      Email,
      IPs,
      Estado,
      FechaInicio,
      FechaFin,
      Roles,
      UsuarioBVQ,
      Firma,
      Cargo,
      Departamento,
      EnviarEmail,
      DocFirmado,
      Rol
    } = data;
    return {
      NombresCompletos,
      NombreUsuario,
      Clave,
      Email,
      IPs,
      Estado,
      FechaInicio,
      FechaFin,
      Roles,
      UsuarioBVQ,
      Firma,
      DepartamentoId: Departamento?.ListaSeleccionId,
      CargoId: Cargo?.ListaSeleccionId,
      RolesId: Rol?.RolId,
      EnviarEmail,
      DocFirmado
    };
  };

  const createRegister = (data: IUsuario) => {
    const dataSend = transformDataNew(data);
    post(apiUsuarioCreate, dataSend)
      .then((res) => {
        const newRegister: IUsuario = { ...res };
        let newListResult: IUsuario[] = listResult;
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

  const transformDataUpdate = (data: IUsuario) => {
    const {
      UsuarioId,
      NombresCompletos,
      NombreUsuario,
      Clave,
      Email,
      IPs,
      Estado,
      FechaInicio,
      FechaFin,
      Roles,
      UsuarioBVQ,
      Firma,
      Cargo,
      Departamento,
      EnviarEmail,
      DocFirmado,
      ClaveFirma,
      Rol
    } = data;
    return {
      UsuarioId,
      NombresCompletos,
      NombreUsuario,
      Clave,
      Email,
      IPs,
      Estado,
      FechaInicio,
      FechaFin,
      Roles,
      UsuarioBVQ,
      Firma,
      DepartamentoId: Departamento?.ListaSeleccionId,
      CargoId: Cargo?.ListaSeleccionId,
      RolesId: Rol?.RolId,
      EnviarEmail,
      DocFirmado,
      ClaveFirma
    };
  };

  const updateRegister = (data: IUsuario) => {
    const dataSend = transformDataUpdate(data);
    let urlSite = replaceObjectInString(apiUsuarioUpdate, {
      id: dataSend.UsuarioId
    });
    put(urlSite, dataSend)
      .then(() => {
        const newListResult = listResult.map((register: IUsuario) =>
          register.UsuarioId === dataSend.UsuarioId
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

  const changePassword = (state: boolean) => {
    setStateHooks((prev) => {
      return { ...prev, isPassword: state };
    });
  };

  const updatePassword = (data: IUsuario) => {
    const dataSend = transformDataUpdate(data);
    let urlSite = replaceObjectInString(apiUsuarioPasswordUpdate, {
      id: dataSend.UsuarioId
    });
    put(urlSite, dataSend)
      .then(() => {
        const newListResult = listResult.map((register: IUsuario) =>
          register.UsuarioId === dataSend.UsuarioId
            ? { ...register, ...dataSend }
            : register
        );
        setListResult(newListResult);
        changePassword(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeSigned = (state: boolean) => {
    setStateHooks((prev) => {
      return { ...prev, isSigned: state };
    });
  };
  const updateSigned = (data: IUsuario) => {
    const dataSend = transformDataUpdate(data);
    let urlSite = replaceObjectInString(apiUsuarioSignedUpdate, {
      id: dataSend.UsuarioId
    });
    put(urlSite, dataSend)
      .then(() => {
        const newListResult = listResult.map((register: IUsuario) =>
          register.UsuarioId === dataSend.UsuarioId
            ? { ...register, ...dataSend }
            : register
        );
        setListResult(newListResult);
        changeSigned(false);
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
    let urlSite = replaceObjectInString(apiUsuarioDelete, { id });
    del(urlSite)
      .then(() => {
        const newListResult = listResult.filter(
          (register: IUsuario) => register.UsuarioId !== id
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
    isPassword,
    isSigned,

    setCurrentResult,
    changeNew,
    createRegister,
    changeEdit,
    updateRegister,
    changePassword,
    updatePassword,
    changeSigned,
    updateSigned,
    changeDelete,
    deleteRegister
  };
};
