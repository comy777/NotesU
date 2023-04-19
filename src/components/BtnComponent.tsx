import { View, Text, TouchableOpacity } from 'react-native'
import { BtnProps } from '../interfaces/components'
import LoadingComponent from './LoadingComponent'

export default function BtnComponent({title, style, textStyle, loading, disabled, onPress}: BtnProps) {
  return (
    <TouchableOpacity activeOpacity={.7} onPress={onPress} disabled={disabled}>
      <View style={style}>
        { loading ? <LoadingComponent color='white'/> : <Text style={textStyle}>{title}</Text> }
      </View>
    </TouchableOpacity>
  )
}
