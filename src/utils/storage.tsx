import AsyncStorage from "@react-native-async-storage/async-storage"
import { NoteResponse } from "../interfaces/api"
import { DataSaveStorage, notesTypes } from "../types/storage"

export const getDataStorage = async (type: notesTypes): Promise<any> => {
  try {
    //await AsyncStorage.removeItem('welcome')
    const dataJson = await AsyncStorage.getItem(type)
    const defaultResp = type === 'notes' ? [] : undefined
    return dataJson ? JSON.parse(dataJson) : defaultResp
  } catch (error) {
    console.log(error)
  }
}

const saveDataStorage = async (type: notesTypes, data: DataSaveStorage) => {
  try {
    const dataJson = JSON.stringify(data.data)
    await AsyncStorage.setItem(type, dataJson)
  } catch (error) {
    console.log(error)
  }
}

export const restoreStorage = async (item: string) => {
  try {
    await AsyncStorage.removeItem(item)
  } catch (error) {
    console.log(error);
  }
}

export const saveNotesStorage = async (data: NoteResponse[], value?: boolean) => {
  if(value) {
    const resp = await getDataStorage('notes')
    await saveDataStorage('notes', { data: [...data, ...resp] })
    return
  }
  await saveDataStorage('notes', { data })
}

export const saveTokenStorage = async (token: string) => {
  await saveDataStorage('token', { data: token })
}

export const deleteNotesStoarge = async (data: string[]) => {
  await saveDataStorage('delete notes', { data })
}

export const saveWelcome = async () => {
  try {
    await AsyncStorage.setItem('welcome', 'true')
  } catch (error) {
    console.log(error)
  }
}