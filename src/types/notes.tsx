import { FileResponse, NoteResponse, UserData, Category } from "../interfaces/api"
import { Category as CategoryStorage, FileContext } from "../interfaces/components"

export type NotesActions = { type: 'set notes', payload: { notes: [] } }
  | { type: 'save notes', payload: { notes: NoteResponse[], categories?: Category[] } }
  | { type: 'set note', payload: { note: NoteResponse | undefined } }
  | { type: 'set files', payload: { files: NoteFiles, id?: string }}
  | { type: 'set file', payload: { file: FileContext | undefined } }
  | { type: 'set index file', payload: { index: number } }
  | { type: 'set token', payload: { token?: string, user?: UserData } }
  | { type: 'set picker value', payload: { value: CategoryStorage } }
  | { type: 'restore context', payload: { notes?: NoteResponse[] } }
  | { type: 'set categories', payload: { categories: Category[] } }

export type filesOptions = 'camera' | 'galery'

export interface NoteForm {
  title: string
  body: string
}

export interface NoteFiles {
  mediaData: FileResponse[]
  filesData: FileResponse[]
}

export const categories = ['note', 'casa', 'universidad', 'otra', 'mandado']