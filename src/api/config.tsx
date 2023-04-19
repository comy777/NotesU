import axios from 'axios'
import Constants from 'expo-constants'
import { getDataStorage } from '../utils/storage'

//Home 'http://192.168.100.19:5050'
//Parents 'http://192.168.0.107:5050'
//Server https://notesu-server-ojl6.onrender.com

const baseURL = Constants.expoConfig?.extra?.apiUrl

export const apiNotes = axios.create({ baseURL })

apiNotes.interceptors.request.use( async (config) => {
  const token = await getDataStorage('token')
  if(token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})