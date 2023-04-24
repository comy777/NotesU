import { StackScreenProps } from "@react-navigation/stack"

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStack { }
  }
}

export type RootStack = {
  'welcome screen': undefined
  'home screen': undefined
  'note screen': undefined
  'files screen': undefined
  'login screen': undefined
  'register screen': undefined
  'verify account': undefined
  'account screen': undefined
}

export interface NoteStack extends StackScreenProps<RootStack, 'note screen'>{}