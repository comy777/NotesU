import { launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { getDocumentAsync } from 'expo-document-picker'
import { FileResponse } from '../../interfaces/api'
import { filesOptions, NoteFiles } from '../../types/notes'
import { showToast } from '../../utils/alert'
import { useContextApp } from '../context/useContextApp'

export const useFiles = () => {
  const { setFilesContext, files, file, setFileContext } = useContextApp()

  const handleFile = async (media: filesOptions, profile?: boolean) => {
    const options = { mediaTypes: MediaTypeOptions.All }
    const result = media === 'camera' ? await launchCameraAsync(options) : await launchImageLibraryAsync(options)
    if(result.canceled) {
      showToast('Cancel')
      return
    }
    const { uri, fileName, type } = result.assets[0]
    if(!type) return
    if(type === 'image' || type === 'video'){
      const nameSplit = uri.split("/")
      const name = nameSplit[nameSplit.length - 1]
      const newFile: FileResponse = { file_name: name, url: uri, type }
      insertFiles(newFile, 'media', profile)
    }
  }

  const handleGetDocument = async () => {
    const resp = await getDocumentAsync()
    if(resp.type === 'cancel') return
    const { mimeType, name, uri, type } = resp
    if(!mimeType) return
    const data: FileResponse = { file_name: name, type: mimeType, url: uri }
    insertFiles(data, 'data')
  }

  const insertFiles = (file: FileResponse, type: string, profile?: boolean) => {
    const newFiles = type === 'media' 
    ? { mediaData: [file, ...files.mediaData], filesData: [...files.filesData] }
    : { mediaData: [...files.mediaData], filesData: [file, ...files.filesData] }
    //if(newFiles.length > 5) newFiles.pop()
    if(profile) newFiles.mediaData = [file]
    setFilesContext(newFiles)
  }

  const resetFiles = (data?: NoteFiles) => {
    const newData: NoteFiles = data ? data : { mediaData: [], filesData: [] }
    setFilesContext(newData)
  }

  const deleteFileContext = (type: string, index?: number) => {
    if(!file) return
    const { filesData, mediaData } = files
    const data = type === 'media' ? mediaData : filesData
    const i = index ? index : file.index
    const elemetDeleted = data[i]
    data.splice(i, 1)
    const newData = type === 'media' ? { filesData, mediaData: data } : { mediaData, filesData: data }
    setFilesContext(newData, elemetDeleted._id)
    setFileContext(undefined)
  }

  return { handleFile, resetFiles, handleGetDocument, deleteFileContext }
}