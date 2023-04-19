import { useReducer } from "react"
import { Category, NoteResponse, UserData } from "../../interfaces/api"
import { Category as CategoryStorage, FileContext } from "../../interfaces/components"
import { notesStateInit } from "../../interfaces/context"
import { notesReducer } from "../../reducers.tsx/notes"
import { NoteFiles } from "../../types/notes"

const useReducerNotes = () => {
  const [state, dispatch] = useReducer(notesReducer, notesStateInit)
  
  const saveNotesContext = (notes: NoteResponse[]) => dispatch({type: 'save notes', payload: {notes}})
  const setNoteContext = (note: NoteResponse | undefined) => dispatch({type: 'set note', payload: {note}})
  const setFilesContext = (files: NoteFiles, id?: string) => dispatch({type: 'set files', payload: {files, id}})
  const setFileContext = (file: FileContext | undefined) => dispatch({type: 'set file', payload: {file}}) 
  const setIndexFile = (index: number) => dispatch({type: 'set index file', payload: {index}}) 
  const setTokenContext = (token?: string, user?: UserData) => 
    dispatch({type: 'set token', payload: { token , user }}) 
  const setPickerValue = (value: CategoryStorage) => dispatch({type: 'set picker value', payload: {value}}) 
  const restoreContext = (notes?: NoteResponse[]) => 
    dispatch({type: 'restore context', payload: { notes }})
  const setCategories = (categories: Category[]) => dispatch({ type: 'set categories', payload: { categories } })

  return { 
    ...state, 
    saveNotesContext, 
    setNoteContext, 
    setFilesContext, 
    setFileContext, 
    setIndexFile, 
    setTokenContext,
    setPickerValue,
    restoreContext,
    setCategories
  }
}

export default useReducerNotes