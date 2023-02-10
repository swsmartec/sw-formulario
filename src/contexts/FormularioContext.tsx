import { useFormulario } from '@/contexts/hooks/useFormulario';
import { IFormularioContext } from 'interfaces/Formulario';
import { createContext, ReactNode } from 'react';

export const FormularioContext = createContext<IFormularioContext>(
  {} as IFormularioContext
);

type Props = {
  children: ReactNode;
};

export function FormularioProvider({ children }: Props) {
  const {
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
  } = useFormulario();

  return (
    <FormularioContext.Provider
      value={{
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
      }}
    >
      {children}
    </FormularioContext.Provider>
  );
}
