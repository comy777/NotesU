import { View } from 'react-native'
import BtnComponent from '../../components/BtnComponent'
import TextInputComponent from '../../components/TextInputComponent'
import { useStyles } from '../../hooks/utils/useStyles'
import { useAuth } from '../../hooks/auth/useAuth'

export default function LoginScreen() {
  const { styles } = useStyles()
  const { 
    show, loading, email, password, handleChangeText, handleNavigate, handleSubmit, handleShow, handleNavigateAccount
  } = useAuth()

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <TextInputComponent 
          handleChangeText={handleChangeText}
          title='Email'
          name='email'
          value={email}
        />
        <TextInputComponent 
          name='password'
          value={password}
          password={show}
          setShow={handleShow}
          handleChangeText={handleChangeText}
          title='Password'
          showPassword
        />
        <BtnComponent 
          title='Sign in' 
          style={styles.btnContainer} 
          textStyle={styles.btnText} 
          onPress={() => handleSubmit('login', '/auth')}
          loading={loading}
          disabled={loading}
        />
        <BtnComponent 
          title='Create account' 
          style={{}} 
          textStyle={styles.textColor} 
          onPress={handleNavigate}
          disabled={loading}
        />
        <BtnComponent 
          title='Forgot your password?' 
          style={{marginTop: 15}} 
          textStyle={styles.textColor} 
          onPress={handleNavigateAccount}
          disabled={loading}
        />
      </View>
    </View>
  )
}
