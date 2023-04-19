import { ActivityIndicator, View } from 'react-native'
import { LoadingProps } from '../interfaces/components'

export default function LoadingComponent({color}: LoadingProps) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={42} color={color} />
    </View>
  )
}
