import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { DarkTheme, LightTheme } from '../theme/theme'
import Header from '../components/HeaderComponent'
import HomeScreen from '../screens/HomeScreen'
import ModalComponent from '../components/ModalComponent'
import NoteScreen from '../screens/NoteScreen'
import FilesScreen from '../screens/FilesScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import { useRoutes } from '../hooks/utils/useRoutes'
import LoadingComponent from '../components/LoadingComponent'
import { VerifyAccount } from '../screens/auth/VerifyAccount'
import Account from '../screens/auth/Account'
import WelcomeScreen from '../screens/WelcomeScreen'

const Stack = createStackNavigator()

export default function AppRoutes(){
  const { darkTheme, loading, welcome } = useRoutes()

  if(loading && !welcome) return <LoadingComponent color='teal'/>

  return (
    <NavigationContainer theme={ darkTheme ?  DarkTheme : LightTheme }>
      { welcome ? <Header/> : null }
      <Stack.Navigator screenOptions={{headerShown: false}}>
        { welcome ? null : <Stack.Screen name='welcome screen' component={WelcomeScreen}/> }
        <Stack.Screen name='home screen' component={HomeScreen}/>
        <Stack.Screen name='note screen' component={NoteScreen}/>
        <Stack.Screen name='files screen' component={FilesScreen}/>
        <Stack.Screen name='login screen' component={LoginScreen}/>
        <Stack.Screen name='register screen' component={RegisterScreen}/>
        <Stack.Screen name='verify account' component={VerifyAccount} />
        <Stack.Screen name='account screen' component={Account} />
      </Stack.Navigator>
      <ModalComponent />
    </NavigationContainer>
  )
}