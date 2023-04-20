import { useEffect, useState } from "react"
import { useColorScheme } from 'react-native'
import { getDataStorage, saveTokenStorage } from "../../utils/storage"
import { useContextApp } from "../context/useContextApp"
import { getUserApi, refreshTokenApi } from "../../api/auth"
import { useUtils } from "./useUtils"

export const useRoutes = () => {
  const { setTokenContext, darkTheme, setTheme } = useContextApp()
  const [loading, setLoading] = useState(true)
  const themeSystem = useColorScheme()
  const { hasInternet } = useUtils()

  const getThemeSystem = async () => (themeSystem === 'dark' && !darkTheme) && setTheme()
  
  const refreshToken = async () => {
    const token = await getDataStorage('token')
    if(!token || !hasInternet()) {
      setLoading(false)
      return
    }
    const tokenResp = await refreshTokenApi(token)
    if(tokenResp){
      const user = await getUserApi()
      setTokenContext(tokenResp, user)
      await saveTokenStorage(tokenResp)
    }
    setLoading(false)
  }
  
  useEffect(() => {
    (async() => {
      await getThemeSystem()
      await refreshToken()
    })()
  }, [])

  useEffect(() => {
    getThemeSystem()
  }, [themeSystem])
  
  return { darkTheme, loading, refreshToken }

}