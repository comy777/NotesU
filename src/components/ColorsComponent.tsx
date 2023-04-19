import { FlashList } from '@shopify/flash-list'
import { View, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { useStyles } from '../hooks/utils/useStyles'
import { Colors, ColorsComponentProps } from '../interfaces/components'

export default function ColorsComponent({colors, onChangeColor, onSelect, onCancel}: ColorsComponentProps) {
  const { styles } = useStyles()

  function Color({color, selected}: Colors){
    return (
      <TouchableOpacity activeOpacity={.7} onPress={() => onChangeColor(color)}>
        <View style={{...styles.cardColor, backgroundColor: color}}>
          { selected && <Icon name='checkmark-outline' size={24} color='white' /> }
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.containerColors}>
      <View style={styles.centeredView}>
        <View style={styles.modalColors}>
          <View style={styles.marginColorContainer}>
            <View style={{ flex: .9 }}> 
              <FlashList 
                data={colors}
                renderItem={({ item }) => <Color {...item}/>}
                keyExtractor={(item, i) => i.toString()}
                estimatedItemSize={45}
                numColumns={5}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        <View style={{...styles.contentEvenly, flex: .1}}>
          <Icon name='close-outline' size={42} color='white' onPress={onCancel} />
          <Icon name='checkmark-outline' size={42} color='white' onPress={onSelect} />
        </View>
        </View>
      </View>
    </View>
  )
}
