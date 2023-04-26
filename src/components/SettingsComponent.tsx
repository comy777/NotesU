import { View, Text, Switch } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { useStyles } from '../hooks/utils/useStyles'
import { useComponents } from '../hooks/components/useComponents'

export default function SettingsComponent() {
  const { styles, colors } = useStyles()
  const { token, user, handleAuth, darkTheme, handleTheme, handleNavigate } = useComponents()

  return (
    <View style={styles.settings}>
      <View style={styles.iconsBetween}>
        <Text style={{...styles.title, color: colors.background}}>{token ? 'Logout' : 'Sign in'}</Text>
        <Icon
          name={token ? 'log-in-outline' : 'log-in-outline'}
          size={40}
          onPress={() => handleAuth()}
          color={colors.background}
        />
      </View>
      <View style={styles.iconsBetween}>
        <Text style={{...styles.title, color: colors.background}}>Theme</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#767577' }}
          thumbColor={darkTheme ? 'white' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => handleTheme()}
          value={darkTheme}
        />
      </View>
      {
        user && (
          <View style={styles.iconsBetween}>
            <Text style={{...styles.title, color: colors.background}}>Account</Text>
            <Icon name='person-circle' size={40} onPress={() => handleNavigate('account screen')} color={colors.background} />
          </View>
        )
      }
    </View>
  )
}