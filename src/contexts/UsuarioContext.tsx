import { useUsuario } from '@/contexts/hooks/useUsuario';
import { IUsuarioContext } from 'interfaces/Usuario';
import { createContext, ReactNode } from 'react';

export const UsuarioContext = createContext<IUsuarioContext>(
  {} as IUsuarioContext
);

type Props = {
  children: ReactNode;
};

export function UsuarioProvider({ children }: Props) {
  const {
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
  } = useUsuario();

  return (
    <UsuarioContext.Provider
      value={{
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
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
