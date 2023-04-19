import { View, TextInput } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { useStyles } from '../hooks/utils/useStyles'
import { PasswordProps } from '../interfaces/components'
import TextInputcomponent from './TextInputComponent'

export default function PasswordComponent(
  {show, value, name, handleChangeText, handleShow}: PasswordProps) {
  const { styles } = useStyles()

  return (
    <View>
      <TextInputcomponent
        title='Password' 
        value={value}
        handleChangeText={handleChangeText}
        name='password'
      />
      <Icon name={show ? 'eye-outline' : 'eye-off-outline'} size={24} onPress={handleShow} />
    </View>
  )
}
