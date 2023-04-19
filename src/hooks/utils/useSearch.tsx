import { useEffect, useState } from "react"
import { NoteResponse } from "../../interfaces/api"
import { useContextApp } from "../context/useContextApp"
import { useForm } from "./useForm"
import { useStyles } from "./useStyles"

export const useSearch = (time = 500) => {
  const { search, handleChangeText, resetForm } = useForm({ search: '' })
  const { notes, saveNotesContext } = useContextApp()
  const [data, setData] = useState<NoteResponse[]>(notes)
  const { styles } = useStyles()

  const searchTerm = () => {
    const valueSearch = search.toLowerCase().trim()
    const resp = data.filter((note) => {
      const { title, body } = note
      const titleSearch = title.toLowerCase()
      const bodySearch = body.toLowerCase()
      if(titleSearch.includes(valueSearch) || bodySearch.includes(valueSearch)) return note
    })
    saveNotesContext(resp)
  }

  const resetSearch = () => resetForm({ search: ''})

  useEffect(() => {
    const timeout = setTimeout(() => {
      if(!search) { 
        saveNotesContext(data)
        return
      }
      searchTerm()
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return { search, handleChangeText, styles, resetSearch }
}