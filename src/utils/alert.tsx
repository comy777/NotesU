import { Alert, ToastAndroid } from "react-native"
import { AlertProps } from "../interfaces/components"

export const showAlert = ({title, message, action}: AlertProps) => {
  Alert.alert(title, message, [{text: 'Cancel', style: 'cancel'}, {text: 'Sure', onPress: action}])
}

export const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT)
}