import { FormAuth } from "../interfaces/components";
import { showToast } from "./alert";

export const validateAuthForm = (form: FormAuth, type: string): boolean | undefined => {
  const { email, password, repeatPassword } = form
  if (!email || !password) {
    showToast('All the fields are required')
    return
  }
  if (type === 'register') {
    if (password !== repeatPassword) {
      showToast('The password are not equals')
      return
    }
  }
  return true
}
