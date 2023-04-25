import { useState } from "react"
import { UiState } from "../../interfaces/context"
import { useStyles } from "../utils/useStyles"

export const useUi = () => {
  const { colors } = useStyles()

  const [state, setState] = useState<UiState>({
    darkTheme: false,
    modal: false,
    colorPicker: colors.background,
    welcome: false,
    searchCategories: false
  })

  const setTheme = () => setState({ ...state, darkTheme: !state.darkTheme })

  const setModal = (value: boolean) => setState({ ...state, modal: value })

  const setWelcome = () => setState({ ...state, welcome: true })

  const setColorPicker = (colorPicker?: string, modal?: boolean) => {
    modal ? setState({ ...state, colorPicker, modal: modal }) : setState({ ...state, colorPicker })
  }

  const setSearchCategories = (value: boolean) => setState({ ...state, searchCategories: value })

  return { state, setTheme, setModal, setColorPicker, setWelcome, setSearchCategories }
  
}