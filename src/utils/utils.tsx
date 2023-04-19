import uuid from 'react-native-uuid'
import { NoteResponse } from "../interfaces/api";
import { NoteUtils } from '../interfaces/components';

export const modifyNotes = (notes: NoteResponse[]): NoteResponse[] => {
  return notes.map((note) => ({...note, select: false}))
}

export const getNote = ({title, body, colorPicker, files, categorie, id}: NoteUtils): NoteResponse => {
  const _id = id ? id : uuid.v4().toString()
  const dateNow = new Date().toDateString()
  const data: NoteResponse = { 
    _id, 
    title, 
    body, 
    background: colorPicker ? colorPicker : 'white', 
    createdAt: dateNow, 
    updatedAt: dateNow, 
    files, 
    local: true,
    select: false,
    categorie
  }
  return data
}