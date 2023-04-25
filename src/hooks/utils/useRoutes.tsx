import { useEffect, useState } from "react"
import { useColorScheme } from 'react-native'
import { getDataStorage, restoreStorage, saveTokenStorage } from "../../utils/storage"
import { useContextApp } from "../context/useContextApp"
import { getUserApi, refreshTokenApi } from "../../api/auth"
import { useUtils } from "./useUtils"

export const useRoutes = () => {
  const { setTokenContext, darkTheme, setTheme, welcome, setWelcome } = useContextApp()
  const [loading, setLoading] = useState(true)
  const themeSystem = useColorScheme()
  const { hasInternet } = useUtils()

  const getThemeSystem = async () => (themeSystem === 'dark' && !darkTheme) && setTheme()
  
  const refreshToken = async () => {
    const token = await getDataStorage('token')
    console.log(token)
    if(!token || !hasInternet()) {
      setLoading(false)
      return
    }
    const tokenResp = await refreshTokenApi(token)
    if(!tokenResp) await restoreStorage('token')
    if(tokenResp){
      const user = await getUserApi()
      setTokenContext(tokenResp, user)
      await saveTokenStorage(tokenResp)
    }
    setLoading(false)
  }

  const validateWelcome = async () => {
    const resp = await getDataStorage('welcome')
    if(resp) setWelcome()
    await getThemeSystem()
    await refreshToken()
  }
  
  useEffect(() => {
    (async() => await validateWelcome())()
  }, [])

  useEffect(() => {
    getThemeSystem()
  }, [themeSystem])
  
  return { darkTheme, loading, welcome, refreshToken }

}