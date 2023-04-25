import { View, Text, TextInput, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useComponents } from '../hooks/components/useComponents'
import BtnComponent from './BtnComponent'
import { useStyles } from '../hooks/utils/useStyles'
import { PickerProps } from '../interfaces/components'

export default function PickerComponent({onPress}: PickerProps) {
  const { handlePickerValue, pickerValue, other, handleOther, categories } = useComponents()
  const { styles } = useStyles()
  const { category } = pickerValue
  
  return (
    <View style={{ ...styles.fabAbsolute, zIndex: 9999999 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Select Category</Text>
          <Picker selectedValue={category} onValueChange={handlePickerValue} style={styles.pickerItem}>
            {
              categories.map((categorie) => <Picker.Item key={categorie._id} label={categorie.categorie} value={categorie._id} />)
            }
            <Picker.Item label='Other' value='other' />
          </Picker>
          { category === 'other' && <TextInput placeholder='Which?' style={{ ...styles.pickerItem, marginTop: 0, paddingHorizontal: 15 }} value={other} onChangeText={handleOther} maxLength={15} /> }
          <BtnComponent 
            title='Select' 
            style={styles.btnContainer} 
            textStyle={styles.btnText} 
            onPress={() => onPress(true)}
            disabled={category === 'otra' && !other ? true : false}
          />
        </View>
      </View>
    </View>
  )
}
