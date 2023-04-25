import NetInfo from '@react-native-community/netinfo'
import { FileResponse } from '../../interfaces/api'
import { useContextApp } from '../context/useContextApp'
import { showToast } from '../../utils/alert'
import { saveCategoriesApi } from '../../api/categories'

export const useUtils = () => {
  const { categories, pickerValue, token } = useContextApp()

  const hasInternet = async () => {
    const resp = await NetInfo.fetch()
    return resp.isConnected
  }

  const setDataForm = (dataFiles: FileResponse[], icon?: boolean) => {
    const formData: any  = new FormData()
    dataFiles.forEach((file) => {
      if(file._id) return
      let type = file.type
      if(type === 'image' || type === 'video'){
        const mimeSplit = file.url.split(".")
        const mime = mimeSplit[mimeSplit.length - 1]
        type = `${type}/${mime}`
      }
      const data = { 
        uri : file.url,
        type,
        name: file.file_name
      }
      formData.append('upload_file', data)
      if(icon) formData.append('icon', '')
    })
    return formData
  }

  const validateCategories = async (): Promise<string | undefined> => {
    let bandera = false
    const { category, other } = pickerValue
    const validate = categories.filter((categorie) => categorie.categorie === other.trim())
    if(validate.length > 0) {
      showToast('Category already exists')
      return
    }
    let newCategory = category
    if (token && category === 'other') {
      const resp = await saveCategoriesApi(other)
      if (!resp) {
        bandera = true
        return
      }
      newCategory = resp._id
    }
    if (bandera) return
    if(categories.length > 0) {
      categories.forEach((value) => {
        if(value.categorie === newCategory) newCategory = value._id
      })
    }
    return newCategory
  }

  return { hasInternet, setDataForm, validateCategories }
}