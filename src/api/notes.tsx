import { isAxiosError } from "axios"
import { NoteApiForm, NoteResponse, Params, QueryResponse } from "../interfaces/api"
import { apiNotes } from "./config"
import { showToast } from "../utils/alert"

const notesQuery = async ({method, url, params}: Params): Promise<QueryResponse | undefined> => {
  try {
    const { data } = await apiNotes({ method, url, data: params })
    return data
  } catch (error) {
    console.log(error)
    if(isAxiosError(error) && error.response){
      console.log(error.response.data)
      if(error.response.data.error === 'jwt expired') return { error: 'Refresh token' }
      if(error.response.data.error === 'Email not validate yet') {
        showToast(error.response.data.error)
        return { error: error.response.data.error }
      }
    }
  }
}

export const getNotesApi = async () => {
  const query: Params = { method: 'get', url: '/home' }
  const resp = await notesQuery(query)
  if(!resp) return
  return resp.notes
}

export const saveFilesApi = async (formData: FormData, id: string) => {
  try {
    const url = `/home/files/${id}`
    const headers = { 'Content-Type': 'multipart/form-data' }
    const { data } = await apiNotes.post(url, formData, { headers })
    return data.note
  } catch (error) {
    console.log(error)
    if(isAxiosError(error) && error.response){
      console.log(error.response.data)
    }
  }
}

export const uploadNoteApi = async (notes: NoteResponse[]) => {
  try {
    const { data } = await apiNotes.post('/home/save-notes', { notes })
    return data.notes
  } catch (error) {
    console.log(error)
    if(isAxiosError(error) && error.response){
      console.log(error.response.data)
    }
  }
  // const query: Params = { url: '/home/save-notes', method: 'post', params: { notes } }
  // const resp = await notesQuery(query)
  // return resp?.notes
}

export const saveNoteApi = async (data: NoteApiForm, id?: string): Promise<NoteResponse | undefined> => {
  const query = { method: 'post', url: '/home', params: data }
  const resp = await notesQuery(query)
  return resp?.note
}

export const editNoteApi = async (id: string, data: NoteApiForm): Promise<NoteResponse | undefined> => {
  const query = { method: 'put', url: `/home/${id}`, params: data }
  const resp = await notesQuery(query)
  return resp?.note
}

export const deleteNoteApi = async (id: string): Promise<string | undefined> => {
  const query = { method: 'delete', url: `/home/${id}` }
  const resp = await notesQuery(query)
  return resp?.msg
}

export const deleteManyFilesApi = async (files: string[]): Promise<string | undefined> => {
  const query = { method: 'post', url: `/home/delete-files`, params: { files } }
  const resp = await notesQuery(query)
  return resp?.msg
}