import { ScrollView } from 'react-native'
import { NoteFiles } from "../../types/notes"
import { useContextApp } from "../context/useContextApp"
import { useForm } from "../utils/useForm"
import { saveNotesStorage } from '../../utils/storage'
import { LegacyRef, useEffect, useRef, useState } from "react"
import { showToast } from '../../utils/alert'
import { NotePropsState } from '../../interfaces/components'
import { useFiles } from '../components/useFiles'
import { NoteResponse } from '../../interfaces/api'
import { useStyles } from '../utils/useStyles'
import { colorsNote } from '../../utils/colors'
import { Keyboard } from 'react-native'
import { useNotesApi } from './useNotesApi'
import { getNote } from '../../utils/utils'
import { useUtils } from '../utils/useUtils'

export const useNote = () => {
  const { styles, colors } = useStyles()
  const { title, body, handleChangeText, resetForm } = useForm({ title: '', body: '' })
  const {
    notes,
    note,
    files,
    colorPicker,
    token,
    deletedFiles,
    setNoteContext,
    setColorPicker,
    setPickerValue,
    restoreContext,
  } = useContextApp()
  const { handleFile, resetFiles, handleGetDocument } = useFiles()
  const { saveNoteDb } = useNotesApi()
  const refScroll: LegacyRef<ScrollView> = useRef(null)
  const { validateCategories, hasInternet } = useUtils()

  const noteSate: NotePropsState = {
    loading: false,
    id: '',
    options: false,
    internet: true,
    showColors: false,
    colorsData: colorsNote(),
    showCategories: false
  }

  const [state, setState] = useState<NotePropsState>(noteSate)
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const saveDataAndReset = async (newNotes: NoteResponse[], msg: string, note: NoteResponse) => {
    if(!token || !hasInternet()) await saveNotesStorage([note], true)
    resetForm()
    resetFiles()
    setState({ ...state, loading: false, id: '', options: false, showCategories: false })
    restoreContext(newNotes)
    setColorPicker()
    showToast(msg)
  }

  const handleSave = async (categorie: string) => {
    setState({ ...state, loading: true })
    if (!title && !body) return
    const { filesData, mediaData } = files
    const newFiles: NoteFiles = { filesData, mediaData }
    if (state.id) {
      handleEditNote(state.id, newFiles, categorie)
      return
    }
    let data: NoteResponse | undefined = undefined
    if (token) data = await saveNoteDb({ title, body, background: colorPicker ? colorPicker : 'white', categorie }, newFiles)
    if (!data) data = getNote({ title, body, colorPicker, files: newFiles, categorie })
    const newNotes = data ? [{ ...data, select: false }, ...notes] : notes
    await saveDataAndReset(newNotes, 'Save note', data)
  }

  const handleEditNote = async (id: string, newFiles: NoteFiles, categorie: string) => {
    let data: any
    if (token) data = await saveNoteDb({ title, body, background: colorPicker ? colorPicker : 'white', categorie }, newFiles, id, deletedFiles)
    if (!data) data = getNote({ title, body, colorPicker, files: newFiles, categorie, id })
    const newNotes = data ? notes.map((note) => note._id === id ? { ...data, select: false } : note) : notes
    await saveDataAndReset(newNotes, 'Edit note', data)
  }

  const handleOptions = () => setState({ ...state, options: !state.options })

  const handleResetNote = (note: NoteResponse) => {
    resetForm(note)
    resetFiles(note.files)
    setState({ ...state, id: note._id })
    setNoteContext(undefined)
    setPickerValue({ category: note.categorie, other: '' })
  }

  const handleShowColors = () => setState({ ...state, options: false, showColors: true })

  const handleSelectColor = (data: string) => {
    const newColors = state.colorsData.map((color) => (
      color.color === data ? { color: data, selected: true } : { color: color.color, selected: false }
    ))
    setColorPicker(data)
    setState({ ...state, colorsData: newColors })
  }

  const handleColor = (type: 'select' | 'cancel') => {
    if (type === 'cancel') setColorPicker(colors.background)
    setState({ ...state, colorsData: colorsNote(), showColors: false })
  }

  const scrollToBottom = () => {
    if (!refScroll.current || !keyboardStatus) return
    refScroll.current.scrollToEnd({ animated: true })
  }

  const handleShowPicker = async (save?: boolean) => {
    if (save) {
      const validate = await validateCategories()
      if(!validate) return
      await handleSave(validate)
    }
    setState({ ...state, options: false, showCategories: !state.showCategories })
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      if (!keyboardStatus) setKeyboardStatus(true);
    });
    return () => {
      showSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (note) handleResetNote(note)
  }, [note])


  return {
    ...state,
    title,
    body,
    files,
    styles,
    colorPicker,
    refScroll,
    colors,
    handleChangeText,
    handleSave,
    handleOptions,
    handleFile,
    handleGetDocument,
    handleShowColors,
    handleSelectColor,
    handleColor,
    scrollToBottom,
    handleShowPicker
  }
}