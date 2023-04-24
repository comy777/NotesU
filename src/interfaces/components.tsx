import Icon from '@expo/vector-icons/Ionicons'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { NoteFiles } from '../types/notes'
import { FileResponse, NoteResponse, Category as CategoryApi } from './api'

export interface FabProps {
  icon: keyof typeof Icon.glyphMap
  options?: boolean
  showColors?: boolean
  loading?: boolean
  onPress?: () => void
  onPressSave?: () => void
  onPressFile?: () => void
  onPressCamera?: () => void
  onPressGalery?: () => void
  onPressColors?: () => void
}

export interface NoteProps {
  note: NoteResponse
  index: number
  onPress: (note: NoteResponse, index: number) => void
  onSelect: (index: number) => void
}

export interface NoteModalProps {
  note: NoteResponse
  delteNote: (id: string) => void
  editNote: () => void
}

export interface AlertProps {
  title: string
  message: string
  action?: () => void
}

export interface Colors {
  color: string
  selected: boolean
}

export interface NotePropsState {
  loading: boolean
  id: string
  options: boolean
  internet: boolean
  showColors: boolean
  colorsData: Colors[]
  showCategories: boolean
}

export interface FileProps {
  mediaData: FileResponse[]
}

export interface FilePreviewProps {
  url: string
  type: string
  onPress?: () => void
  showFile: (uri: string, name?: string) => void
}

export interface BtnProps {
  title: string
  style: StyleProp<ViewStyle>
  textStyle: StyleProp<TextStyle>
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
}

export interface VideoProps {
  uri: string
}

export interface FileComponentProps {
  file: FileResponse
  index: number
}

export interface FileContext {
  file: FileResponse
  index: number
}

export interface PasswordProps {
  show: boolean
  handleShow: () => void
  value: string
  handleChangeText: (name: FromAuthTypes, value: string) => void
  name: FromAuthTypes
}

export interface FormAuth {
  email: string
  password: string
  repeatPassword?: string
  username?: string
}

export interface FormApiAuth {
  email: string
  password?: string
  repeatPassword?: string
  username?: string
}

export type FromAuthTypes = 'email' | 'password' | 'username' | 'repeatPassword'

export interface AuthPropsState {
  loading: boolean
  show: boolean
}

export interface LoadingProps {
  color: string
}

export interface ColorsComponentProps {
  colors: Colors[]
  onChangeColor: (color: string) => void
  onSelect: () => void
  onCancel: () => void
}

export interface HomeStateProps {
  loading: boolean
  select: boolean
  deleted: string[]
}

export interface NoteUtils {
  title: string
  body: string
  colorPicker?: string
  id?: string
  files: NoteFiles
  categorie: string
}

export interface PickerProps {
  onPress: (value: boolean) => void
}

export interface Category {
  category: string
  other: string 
}

export type FormAccountTypes = 'username' | 'email' | 'title' | 'body' | 'password' | 'repeatPassword'

export interface InputFloatProps {
  value: string
  handleChangeText: (name: any, value: string) => void
  name: FormAccountTypes
  editable?: boolean
  title: string
  password?: boolean
  setShow?: () => void
  showPassword?: boolean
}

export interface AccountState {
  editUser: boolean
  image: string
  loading: boolean
}

export interface CheckBoxComponentProps {
  category: CategoryApi
  handleChangeCategory: (value: string, insert: boolean) => void
}

export interface DataWelcome {
  background: string
  title: string
  body: string
  index: number
}