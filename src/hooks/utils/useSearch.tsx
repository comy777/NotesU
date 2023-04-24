import { useEffect, useState } from "react"
import { NoteResponse } from "../../interfaces/api"
import { useContextApp } from "../context/useContextApp"
import { useForm } from "./useForm"
import { useStyles } from "./useStyles"

export const useSearch = (time = 500) => {
  const { search, handleChangeText, resetForm } = useForm({ search: '' })
  const { notes, categories, saveNotesContext } = useContextApp()
  const [data, setData] = useState<NoteResponse[]>(notes)
  const { styles } = useStyles()
  const [showCategories, setShowCategories] = useState(false)
  const [categoriesSearch, setCategoriesSearch] = useState<string[]>([])

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

  const handleShowCategories = (value: boolean) => {
    if(value && categories.length === 0) return
    setShowCategories(value)
  }

  const handleCategory = (category: string, insert: boolean) => {
    const resp = insert ? [...categoriesSearch, category] :  categoriesSearch.filter((value) => value !== category)
    const notes = data.filter((note) => resp.includes(note.categorie))
    setCategoriesSearch(resp)
    notes.length === 0 ? saveNotesContext(data) : saveNotesContext(notes)
    setShowCategories(false)
  }

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

  return { search, showCategories, styles, categories, resetSearch, handleChangeText, handleShowCategories, handleCategory}
}