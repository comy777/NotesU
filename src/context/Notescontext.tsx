import { createContext } from 'react'
import useReducerNotes from '../hooks/context/useReducerNotes'
import { useUi } from '../hooks/context/useUi'
import { UiStateProps } from '../interfaces/context'

export const NotesContext = createContext({} as UiStateProps)

export function NotesProvider({children}: any){
  const { 
    notes, 
    note, 
    files, 
    file, 
    index,
    token,
    deletedFiles,
    pickerValue,
    user,
    categories,
    saveNotesContext, 
    setNoteContext, 
    setFilesContext, 
    setFileContext, 
    setIndexFile,
    setTokenContext,
    setPickerValue,
    restoreContext,
    setCategories
  } = useReducerNotes()
  const { state, setTheme, setModal, setColorPicker, setWelcome, setSearchCategories } = useUi()
  
  return(
    <NotesContext.Provider value={{ 
      ...state, 
      notes, 
      note,
      files,
      file,
      index,
      token,
      deletedFiles,
      pickerValue,
      user,
      categories,
      setTheme, 
      setModal, 
      setNoteContext, 
      saveNotesContext,
      setFilesContext,
      setFileContext,
      setIndexFile,
      setTokenContext,
      setColorPicker,
      setPickerValue,
      restoreContext,
      setCategories, 
      setWelcome,
      setSearchCategories
    }}>
      { children }
    </NotesContext.Provider>
  )
}