import axios from "axios"
import { apiNotes } from "./config"
import { CategoriesResponse, Category, CategorySave } from "../interfaces/api"

export const getCategoriesApi = async (): Promise<Category[] | undefined> => {
  try {
    const { data } = await apiNotes.get<CategoriesResponse>('/categories')
    return data.categories
  } catch (error) {
    console.log(error)
    if(axios.isAxiosError(error) && error.response){
      console.log(error.response.data)
    }
  }
}

export const saveCategoriesApi = async (categorie: string): Promise<Category | undefined> => {
  try {
    const { data } = await apiNotes.post<CategorySave>('/categories', { categorie })
    return data.categorie
  } catch (error) {
    console.log(error)
    if(axios.isAxiosError(error) && error.response){
      console.log(error.response.data)
    }
  }
}