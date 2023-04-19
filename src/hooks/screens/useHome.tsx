import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { Category, NoteResponse } from "../../interfaces/api"
import { HomeStateProps } from "../../interfaces/components"
import { showAlert } from "../../utils/alert"
import { deleteNotesStoarge, getDataStorage, saveNotesStorage } from "../../utils/storage"
import { modifyNotes } from "../../utils/utils"
import { useContextApp } from "../context/useContextApp"
import { useNotesApi } from "./useNotesApi"
import { useStyles } from "../utils/useStyles"
import { useUtils } from "../utils/useUtils"
import { getCategoriesApi, saveCategoriesApi } from "../../api/categories"
import { getUserApi } from "../../api/auth"

export const useHome = () => {
  const navigation = useNavigation()
  const [state, setState] = useState<HomeStateProps>({ loading: true, select: false, deleted: [] })
  const { colors, styles } = useStyles()
  const { 
    notes, 
    colorPicker,
    token,
    saveNotesContext, 
    setNoteContext, 
    setColorPicker,
    restoreContext,
    setCategories,
    setTokenContext
  } = useContextApp()
  const { getNotesDb, deleteNoteDb } = useNotesApi()
  const { hasInternet } = useUtils()

  const deleteNotes = async (data?: string[]) => {
    const internet = await hasInternet()
    const validate = (!token || !internet) ? false : true
    const notesDeleted = data ? data : state.deleted
    if(validate){
      const promises: any[] = []
      notesDeleted.forEach((id) => promises.push(deleteNoteDb(id)))
      await Promise.all(promises)
      if(notesDeleted) return
    }
    if(token && !internet) await deleteNotesStoarge(notesDeleted)
    const newNotes: NoteResponse[] = []
    notes.forEach((note) => {
      let bandera = false
      state.deleted.forEach((item) => {
        if(note._id === item) bandera = true
      })
      if(!bandera) newNotes.push(note)
    })
    saveNotesContext(newNotes)
  }

  const handleNavigateNote = () => {
    const { select } = state
    if(select) {
      showAlert({title: 'Are you sure?', message: 'Delete notes', action: deleteNotes})
      return
    }
    if(colorPicker !== colors.background) setColorPicker()
    restoreContext()
    navigation.navigate('note screen')
  }

  const handleShowNote = (note: NoteResponse, index: number) => {
    if(state.select) {
      handleSelect(index)
      return
    }
    setNoteContext(note)
    setColorPicker(note.background, true)
  }

  const handleSelect = (index: number) => {
    const newNote = notes[index]
    newNote.select = !newNote.select
    const newNotes = notes.map((note) => note._id === newNote._id ? newNote : note)
    let newDeleted = newNote.select ? [...state.deleted, newNote._id] : [...state.deleted]
    if(!newNote.select) newDeleted = newDeleted.filter((id) => id !== newNote._id)
    const select = newDeleted.length > 0 ? true : false
    setState({...state, select, deleted: newDeleted})
    saveNotesContext(newNotes)
  }

  const getNotesStorage = async () => {
    if(!state.loading) setState({ ...state, loading: true})
    const data = await getDataStorage('notes')
    const deleteNotes = await getDataStorage('delete notes')
    if(deleteNotes && deleteNotes.length > 0) await deleteNotes(deleteNotes)
    const internet = await hasInternet()
    const validate = (token && internet) ? true : false
    const resp = validate ? await getNotesDb(data) : data
    const newNotes = modifyNotes(resp)
    saveNotesContext(newNotes)
    await saveNotesStorage(resp.length === data.length ? resp : [])
    setState({ ...state, loading: false })
  }

  const getCategories = async () => {
    let categories: Category[] = []
    const resp = await getCategoriesApi()
    if(!resp) return
    categories = resp
    if(resp.length === 0) {
      const saveCategorie = await saveCategoriesApi('Note')
      if(saveCategorie) categories.push(saveCategorie)
    }
    setCategories(categories)
  }

  const refreshAccount = async () => {
    const user = await getUserApi()
    setTokenContext(token, user)
    await getNotesStorage()
  }

  useEffect(() => {
    (async () => {
      await getCategories()
      await getNotesStorage()
    })()
  }, [])

  useEffect(() => {
    if(token) {
      (async() => await refreshAccount())
      ()
    }
  }, [token])
  
  
  return { ...state, notes, styles, handleNavigateNote, handleShowNote, handleSelect }
  
}