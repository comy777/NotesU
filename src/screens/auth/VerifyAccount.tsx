import { View } from 'react-native'
import { useStyles } from '../../hooks/utils/useStyles'
import BtnComponent from '../../components/BtnComponent'
import { useAuth } from '../../hooks/auth/useAuth'
import TextInputcomponent from '../../components/TextInputComponent'

export const VerifyAccount = () => {
  const { styles } = useStyles()
  const { email, handleSendEmail, handleChangeText } = useAuth()

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <TextInputcomponent 
          title='Email' 
          value={email} 
          handleChangeText={handleChangeText}
          name='email'
        />
        <BtnComponent title='Send' style={styles.btnContainer} textStyle={styles.btnText} onPress={handleSendEmail} />
      </View>
    </View>
  )
}
