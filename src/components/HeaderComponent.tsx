import { View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { useStyles } from '../hooks/utils/useStyles'
import { useComponents } from '../hooks/components/useComponents'

export default function Header(){
  const { styles } = useStyles()
  const { modal, user, setModal } = useComponents()

  return(
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={{...styles.title, color: 'white'}}>NotesU</Text>
        <TouchableOpacity onPress={() => setModal(!modal)} activeOpacity={.7}>
          { 
            user && user.profile_image ? (
              <Image source={{ uri: user.profile_image }} style={styles.imageHeader} />
            ) : (
              <Icon 
                name='person-circle-outline' 
                size={48} color='white'
              />
            )
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}