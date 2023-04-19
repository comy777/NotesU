import { saveCategoriesApi } from "../../api/categories"
import { deleteManyFilesApi, deleteNoteApi, editNoteApi, getNotesApi, saveFilesApi, saveNoteApi, uploadNoteApi } from "../../api/notes"
import { NoteApiForm, NoteResponse } from "../../interfaces/api"
import { NoteFiles } from "../../types/notes"
import { showToast } from "../../utils/alert"
import { saveNotesStorage } from "../../utils/storage"
import { useUtils } from "../utils/useUtils"

export const useNotesApi = () => {
  const { setDataForm } = useUtils()

  const saveNotesDb = async (notes: NoteResponse[]): Promise<NoteResponse[] | undefined> => {
    const newNotes = await uploadNoteApi(notes)
    if(!newNotes) return
    const dataNotes = []
    for await (const item of newNotes) {
      const { note, files } = item
      if(files.length > 0){
        const formData: any  = setDataForm(files, true)
        if(formData._parts.length > 0) {
          const resp = await saveFilesApi(formData, note._id)
          if(resp) dataNotes.push(resp)
        }
      } else {
        dataNotes.push(note)
      }
    }
    await saveNotesStorage([])
    return dataNotes
  }

  const getNotesDb = async (notes: NoteResponse[]): Promise<NoteResponse[]> => {
    const notesApi = await getNotesApi()
    if(!notesApi) return notes
    const uploadNotes: NoteResponse[] = []
    notes.forEach((note: NoteResponse) => {
      if(note.local) uploadNotes.push(note)
    });
    let data: NoteResponse[] = []
    if(uploadNotes.length > 0){
      const resp = await saveNotesDb(uploadNotes)
      data = resp ? resp : notes
    }
    if(notesApi) await saveNotesStorage([])
    return notesApi ? [...notesApi, ...data] : notes
  }

  const saveNoteDb = async (note: NoteApiForm, files: NoteFiles, id?: string, filesDeleted?: string[])
    : Promise<NoteResponse | undefined> => {
    if(filesDeleted && filesDeleted.length > 0) {
      const respFiles = await deleteManyFilesApi(filesDeleted)
      if(!respFiles) return
    }
    const resp = id ? await editNoteApi(id, note) : await saveNoteApi(note)
    if(!resp) return
    const newFiles = [...files.filesData, ...files.mediaData]
    const formData: any = setDataForm(newFiles, true)
    if(formData._parts.length > 0) return await saveFilesApi(formData, resp._id)
    return resp
  }

  const deleteNoteDb = async (id: string) => {
    const resp = await deleteNoteApi(id)
    if(!resp) return
    showToast(resp)
  }

  const saveCategory = async (categorie: string) => {
    return await saveCategoriesApi(categorie)
  }

  return { getNotesDb, saveNoteDb, deleteNoteDb, saveCategory }
}