import { View, TextInput, KeyboardAvoidingView } from 'react-native'
import BtnComponent from '../../components/BtnComponent'
import PasswordComponent from '../../components/PasswordComponent'
import { useAuth } from '../../hooks/auth/useAuth'
import { useStyles } from '../../hooks/utils/useStyles'
import TextInputcomponent from '../../components/TextInputComponent'

export default function RegisterScreen() {
  const { styles } = useStyles()
  const { 
    show, loading, email, password, username, repeatPassword, handleSubmit, handleShow, handleChangeText
  } = useAuth()

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.centeredView}>
        <TextInputcomponent
          title='Username' 
          value={username ? username : ''}
          handleChangeText={handleChangeText}
          name='username'
        />
        <TextInputcomponent
          title='Email' 
          value={email}
          name='email'
          handleChangeText={handleChangeText}
        />
        <TextInputcomponent
          name='password'
          value={password}
          password={show}
          setShow={handleShow}
          handleChangeText={handleChangeText}
          title='Password'
          showPassword
        />
        <TextInputcomponent
          title='Repeat password' 
          value={repeatPassword ? repeatPassword : ''}
          password={show}
          handleChangeText={handleChangeText}
          name='repeatPassword'  
        />
        <BtnComponent 
          title='Create account' 
          style={styles.btnContainer} 
          textStyle={styles.btnText} 
          onPress={() => handleSubmit('register', '/auth/create-account')}
          loading={loading}
          disabled={loading}
        />
      </View>
    </KeyboardAvoidingView>
  )
}