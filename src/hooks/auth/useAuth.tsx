import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { authApi } from "../../api/auth"
import { AuthPropsState, FormAuth } from "../../interfaces/components"
import { saveTokenStorage } from "../../utils/storage"
import { validateAuthForm } from "../../utils/validate"
import { useContextApp } from "../context/useContextApp"
import { useForm } from "../utils/useForm"
import { RootStack } from "../../interfaces/routes"

export const useAuth = () => {
  const form: FormAuth = { email: '', password: '', username: '', repeatPassword: '' }
  const [state, setState] = useState<AuthPropsState>({ loading: false, show: true })
  const { email, password, username, repeatPassword, handleChangeText, resetForm } = useForm(form)
  const navigation = useNavigation()
  const { setTokenContext } = useContextApp()
  
  const handleShow = () => setState({ ...state, show: !state.show })

  const handleNavigate = () => navigation.navigate('register screen')

  const handleNavigateAccount = () => navigation.navigate('verify account')

  const handleSubmit = async (type: string, url: string) => {
    const form = { email, password, repeatPassword }
    const validate = validateAuthForm(form, type)
    if(!validate) return
    setState({ ...state, loading: true })
    const data = type === 'login' ? { email, password } : form
    const resp = await authApi(url, data)
    setState({ ...state, loading: false })
    if(!resp) return
    const { token, error } = resp
    if(error){
      if(error === 'Verify your email account') navigation.navigate('verify account')
      return
    }
    if(!token) return
    await saveTokenStorage(token)
    setTokenContext(token)
    resetForm()
    navigation.navigate('home screen')
  }

  const handleSendEmail = async () => {
    if(!email) return
    await authApi('/auth/verify-email', { email })
  }
  
  return { 
    ...state, 
    email, 
    password, 
    username, 
    repeatPassword, 
    handleShow, 
    handleChangeText, 
    handleNavigate, 
    handleSubmit,
    handleSendEmail,
    handleNavigateAccount
  }

}