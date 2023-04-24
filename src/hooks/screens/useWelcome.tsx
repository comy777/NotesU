import { useNavigation } from "@react-navigation/native";
import { DataWelcome } from "../../interfaces/components";
import { useContextApp } from "../context/useContextApp";
import useImageScreen from "../utils/useImage";
import { getDataStorage, saveWelcome } from "../../utils/storage";
import { useEffect } from "react";

export const useWelcome = () => {
  const { topRef, index, styles, colors, onPress, setActiveIndex } = useImageScreen();
  const { setWelcome } = useContextApp()
  const navigation = useNavigation()

  const data: DataWelcome[] = [
    { background: colors.primary, title: 'Welcome', body: 'to NotesU', index: 0},
    { background: colors.accent, title: 'NotesU', body: 'this is your app to save your notes', index: 1 },
    { background: colors.background, title: 'Create your account', body: 'and enjoy anywhere, but this is not required', index: 2 },
  ]

  const handleWelcome = async (opt?: boolean) =>  {
    if(!opt) await saveWelcome()
    setWelcome()
    navigation.navigate('home screen')
  }

  const validateWelcome = async () => {
    const resp = await getDataStorage('welcome')
    if(!resp) return
    await handleWelcome(true)
  }

  useEffect(() => {
    (async () => await validateWelcome())()
  }, [])
  

  return { topRef, index, styles, data, onPress, setActiveIndex, setWelcome, handleWelcome }

}