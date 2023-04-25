import { NotesState } from "../interfaces/context";
import { NotesActions } from "../types/notes";

export const notesReducer = (state: NotesState, action: NotesActions): NotesState => {
  switch (action.type) {
    case 'save notes':
      const { notes: notesSave, categories: categoriesSave } = action.payload
      return { ...state, notes: notesSave, categories: categoriesSave ? categoriesSave : state.categories }
    case 'set note':
      const { note } = action.payload
      return { ...state, note, deletedFiles: [] }
    case 'set files':
      const { files, id } = action.payload
      return { ...state, files, deletedFiles: id ? [id, ...state.deletedFiles] : state.deletedFiles }
    case 'set file':
      return { ...state, file: action.payload.file }
    case 'set index file':
      return { ...state, index: action.payload.index }
    case 'set token':
      const { token, user } = action.payload
      return { ...state, token, user }
    case 'set picker value':
      return { ...state, pickerValue: action.payload.value }
    case 'restore context':
      const dataFiles = { filesData: [], mediaData: [] }
      const valuePicker = { category: 'note', other: '' }
      const { notes } = action.payload
      return { 
        ...state,
        notes: notes ? notes : state.notes,
        files: dataFiles, 
        file: undefined, 
        deletedFiles: [], 
        index: 0, 
        note: undefined, 
        pickerValue: valuePicker,
      }
    case 'set categories':
      const { categories } = action.payload
      return { ...state, categories, pickerValue: { category: categories[0]._id, other: '' } }
    default:
      return state
  }
}