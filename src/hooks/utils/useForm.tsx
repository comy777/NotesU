import { useState } from "react"

export const useForm = <T extends Object>(initialState: T) => {
  const [form, setForm] = useState(initialState)

  const handleChangeText = (name: keyof T, value: string) => {
    //if(name === 'body' && value.length >= 255) return
    setForm({ ...form, [name]: value })
  }

  const resetForm = (form?: T) => setForm(form ? form : initialState)

  return { ...form, handleChangeText, resetForm }
}