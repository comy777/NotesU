import { View, Text, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox'
import { useStyles } from '../hooks/utils/useStyles'
import { NoteProps } from '../interfaces/components'

export default function NoteComponent({note, index, onPress, onSelect}: NoteProps) {
  const { styles } = useStyles()
  const { body, title, select, background } = note

  return (
    <TouchableOpacity 
      activeOpacity={.9} 
      onPress={() => onPress(note, index)} 
      onLongPress={() => onSelect(index)}>
      <View style={{...styles.cardNote, backgroundColor: background, position: 'relative'}}>
        <Text>{title}</Text>
        <Text numberOfLines={12}>{body}</Text>
        { select && (
          <View style={{ position: 'absolute', top: 0, right: 0, margin: 15 }}>
            <Checkbox value={true} color={'teal'} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}
