import { useContext } from "react"
import { NotesContext } from "../../context/Notescontext"

export const useContextApp = () => {
  const context = useContext(NotesContext)
  
  return { ...context }
}