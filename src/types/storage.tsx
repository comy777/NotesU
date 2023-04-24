import { NoteResponse } from "../interfaces/api"

export type notesTypes = 'notes' | 'token' | 'delete notes' | 'welcome'

export interface DataSaveStorage {
  data: NoteResponse[] | string | string[]
}