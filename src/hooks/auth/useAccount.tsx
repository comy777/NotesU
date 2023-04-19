import { useEffect, useState } from "react"
import { useContextApp } from "../context/useContextApp"
import { useForm } from "../utils/useForm"
import { useStyles } from "../utils/useStyles"
import { useFiles } from "../components/useFiles"
import { useUtils } from "../utils/useUtils"
import { AccountState } from "../../interfaces/components"
import { updateUserApi } from "../../api/auth"
import { UserData } from "../../interfaces/api"
import { showToast } from "../../utils/alert"

export const useAccount = () => {
  const { user, files, setTokenContext, token } = useContextApp()
  const { styles } = useStyles()
  const { username, email, handleChangeText, resetForm } = useForm({ username: '', email: '' })
  const [state, setState] = useState<AccountState>({ editUser: false, image: '', loading: false })
  const { handleFile, resetFiles } = useFiles()
  const { setDataForm } = useUtils()

  const handleEdit = () => setState({ ...state, editUser: !state.editUser })

  const handleUpdateUser = async () => {
    if(!user || !username) {
      showToast('Username is required')
      return
    }
    setState({ ...state, loading: true })
    let resp: UserData | undefined
    if(files.mediaData.length > 0) {
      const formData: any  = setDataForm(files.mediaData)
      if(formData._parts.length > 0) resp = await updateUserApi('/home/user/upload-profile-image', { file: formData })
      resetFiles()
    }
    if(username !== user.name && username) resp = await updateUserApi('/users', { name: username })
    if(resp) setTokenContext(token, resp)
    setState({ ...state, loading: false, editUser: resp ? false : true })
  }

  useEffect(() => {
    if(!user) return
    if(user.profile_image) setState({ ...state, image: user.profile_image })
    resetForm({ username: user.name, email: user.email })
  }, [])

  useEffect(() => {
    if(files.mediaData.length > 0) setState({ ...state, image: files.mediaData[0].url })
  }, [files])
  
  
  return { ...state, user, username, styles, email, handleChangeText, handleEdit, handleFile, handleUpdateUser }

}