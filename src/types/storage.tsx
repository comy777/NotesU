import { NoteResponse } from "../interfaces/api"

export type notesTypes = 'notes' | 'token' | 'delete notes'

export interface DataSaveStorage {
  data: NoteResponse[] | string | string[]
}