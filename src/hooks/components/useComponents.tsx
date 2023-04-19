import { useNavigation } from "@react-navigation/native"
import { getContentUriAsync, downloadAsync, documentDirectory } from 'expo-file-system';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import { showAlert, showToast } from "../../utils/alert"
import { saveNotesStorage } from "../../utils/storage"
import { useContextApp } from "../context/useContextApp"
import { useFiles } from "./useFiles"
import { useForm } from "../utils/useForm";
import { useNotesApi } from "../screens/useNotesApi";
import { useUtils } from "../utils/useUtils";
import { restoreStorage } from "../../utils/storage";

export const useComponents = () => {
  const { 
    modal, 
    note, 
    notes, 
    file, 
    files, 
    index,
    token, 
    colorPicker,
    pickerValue,
    darkTheme,
    user,
    categories,
    setModal, 
    setNoteContext, 
    saveNotesContext, 
    setFileContext, 
    setIndexFile,
    setTokenContext,
    setPickerValue,
    setTheme
  } = useContextApp()
  const { deleteFileContext } = useFiles()
  const navigation = useNavigation()
  const { deleteNoteDb } = useNotesApi()
  const { hasInternet } = useUtils()
  const { other, handleChangeText } = useForm({ other: pickerValue.other })

  const handleHideModal = () => {
    if(note) setNoteContext(undefined)
    if(file)setFileContext(undefined)
    setModal(false)
  }

  const handleNavigate = (route: 'note screen' | 'login screen' | 'account screen') => {
    setModal(false)
    navigation.navigate(route)
  }

  const handleDeleteNote = async (id: string) => {
    const internet = await hasInternet()
    const newNotes = notes.filter((note) => note._id !== id)
    saveNotesContext(newNotes)
    setModal(false)
    setNoteContext(undefined)
    if(token && internet) await deleteNoteDb(id)
    await saveNotesStorage(newNotes)
    showToast('Note deleted')
  }

  const handleConfirmDeleteNote = (id: string) => {
    const data = {title: 'Delete note', message: 'Are you sure?', action: () => handleDeleteNote(id)}
    showAlert(data)
  }

  const handleChangeFile = (i: number) => setIndexFile(i)

  const handleSelectFile = (index: number, type: string) => {
    const { mediaData, filesData } = files
    const data = type === 'media' ? mediaData[index] : filesData[0]
    setFileContext({ file: data, index })
    setModal(true)
  }

  const handleViewFile = async (url: string, name?: string) => {
    let resp = url
    if(url && name){
      if(url.includes('https')){
        const fileUri =`${documentDirectory}/${name}`
        const { uri } = await downloadAsync(url, fileUri)
        resp = uri
      }
      const fileResp = await getContentUriAsync(resp)
      await startActivityAsync('android.intent.action.VIEW', { data: fileResp, flags: 1 })
      return
    }
    setFileContext(undefined)
    setModal(false)
    navigation.navigate('files screen')
  }

  const handleDeleteFile = (type: string, index?: number) => {
    if(index !== 0) handleChangeFile(0)
    deleteFileContext(type, index)
    setModal(false)
  }

  const handleLogout = async () => {
    await restoreStorage('token')
    setTokenContext()
  }

  const handleAuth = () => {
    if(!token){
      handleNavigate('login screen')
      return
    }
    handleLogout()
  }

  const handlePickerValue = (value: any) => setPickerValue({ category: value, other: '' })

  const handleOther = (value: string, categorie?: string) => {
    handleChangeText('other', value)
    setPickerValue({category: categorie ? categorie : pickerValue.category, other: value})
  }

  const handleTheme = () => setTheme()
  
  return { 
    modal, 
    note, 
    index, 
    file,
    files,
    token,
    colorPicker,
    pickerValue,
    other,
    darkTheme,
    user,
    categories,
    handleHideModal, 
    setModal, 
    handleConfirmDeleteNote, 
    handleNavigate, 
    handleChangeFile,
    handleSelectFile,
    handleViewFile,
    handleDeleteFile,
    handleAuth,
    handlePickerValue,
    handleChangeText,
    handleOther,
    handleTheme
  }
}