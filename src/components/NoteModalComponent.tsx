import { View, Text } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { NoteModalProps } from '../interfaces/components'
import { useStyles } from '../hooks/utils/useStyles'

export default function NoteModal({note, delteNote, editNote}: NoteModalProps) {
  const { styles } = useStyles()

  return (
    <View>
      <View style={styles.modalContainer}>
        <Text style={[styles.title, styles.textCenter]}>{note.title}</Text>
        <Text style={{marginTop: 15}} numberOfLines={20}>{note.body}</Text>
        <View style={styles.pab}>
          <View style={styles.contentEvenly}>
            <Icon name='trash-outline' size={36} onPress={() => delteNote(note._id)}/>
            <Icon name='pencil-outline' size={36} onPress={editNote}/>
          </View>
        </View>
      </View>
    </View>
  )
}