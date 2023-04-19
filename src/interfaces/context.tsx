import { NoteFiles, categories } from "../types/notes"
import { Category, NoteResponse, UserData } from "./api" 
import { Category as CategoryStorage, FileContext } from "./components"

export interface UiStateProps extends NotesStateProps {
  darkTheme: boolean
  modal: boolean
  colorPicker: string | undefined
  setTheme: () => void
  setModal: (value: boolean) => void
  setColorPicker: (color?: string, modal?: boolean) => void
}

export interface UiState {
  darkTheme: boolean
  modal: boolean
  colorPicker: string | undefined
}

export interface NotesStateProps {
  notes: NoteResponse[]
  note: NoteResponse | undefined
  files: NoteFiles
  file: FileContext | undefined
  index: number
  token: string | undefined
  deletedFiles: string[]
  pickerValue: CategoryStorage
  user: UserData | undefined
  categories: Category[]
  saveNotesContext: (notes: NoteResponse[]) => void
  setNoteContext: (note: NoteResponse | undefined) => void
  setFilesContext: (files: NoteFiles, id?: string) => void
  setFileContext: (file: FileContext | undefined) => void
  setIndexFile: (index: number) => void
  setTokenContext: (token?: string, user?: UserData) => void
  setPickerValue: (value: CategoryStorage) => void
  restoreContext: (notes?: NoteResponse[]) => void
  setCategories: (categories: Category[]) => void
}

export interface NotesState {
  notes: NoteResponse[]
  note: NoteResponse | undefined
  files: NoteFiles
  file: FileContext | undefined
  index: number
  token: string | undefined
  deletedFiles: string[]
  pickerValue: CategoryStorage
  user: UserData | undefined
  categories: Category[]
}

export const notesStateInit: NotesState = {
  notes: [],
  note: undefined,
  files: { mediaData: [], filesData: [] },
  file: undefined,
  index: 0,
  token: undefined,
  deletedFiles: [],
  pickerValue: { category: '', other: '' },
  user: undefined,
  categories: []
}