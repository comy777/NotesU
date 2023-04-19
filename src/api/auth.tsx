import axios from "axios";
import { AuthResponse, UpdatDataUser, UserData, UserResponse } from "../interfaces/api";
import { FormApiAuth } from "../interfaces/components";
import { showToast } from "../utils/alert";
import { apiNotes } from "./config";

export const authApi = async (url: string, form: FormApiAuth): Promise<AuthResponse | undefined> => {
  try {
    const { data } = await apiNotes.post<AuthResponse>(url, form)
    const { token, msg } = data
    showToast(msg ?  msg : 'Success')
    return msg ? { msg } : { token }
  } catch (error: any) {
    console.log(error)
    if(axios.isAxiosError(error) && error.response) {
      const { error: response } = error.response.data
      const validate = typeof response === 'string' ? true : false
      let value = response ? response : 'Error'
      showToast(validate ? response : response[0] )
      return { error: value }
    }
    return { error: 'Error internal' }
  }
}

export const authApiGet = async (url: string): Promise<any> => {
  try {
    const { data } = await apiNotes.get(url)
    return data
  } catch (error: any) {
    console.log(error)
    if(axios.isAxiosError(error) && error.response) {
      let value = error.response.data.error ? error.response.data.error : 'Error'
      showToast(value)
      console.log(error.response.data)
    }
  }
}

export const refreshTokenApi = async (value: string): Promise<string | undefined> => {
  const resp = await authApiGet(`/auth/refresh-token/${value}`)
  if(!resp) return
  return resp.token
}

export const getUserApi = async (): Promise<UserData | undefined> => {
  const resp = await authApiGet(`/users`)
  if(!resp) return
  return resp.user
}

export const updateUserApi = async (url: string, user: UpdatDataUser) => {
  try {
    const headers = user.name ? undefined : { 'Content-Type': 'multipart/form-data' }
    const body = user.name ? user : user.file
    const { data } = await apiNotes.put<UserResponse>(url, body, { headers })
    showToast('Update succesful')
    return data.user
  } catch (error) {
    console.log(error)
    if(axios.isAxiosError(error) && error.response){
      const { error: errorMsg } = error.response.data
      if(errorMsg) showToast(errorMsg)
      console.log(error.response.data)
    }
  }
}