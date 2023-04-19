import { View, TextInput } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { useSearch } from '../hooks/utils/useSearch'

export default function SearchComponent() {
  const { search, styles, handleChangeText, resetSearch } = useSearch()

  return (
    <View style={styles.searchContainer}>
      <View style={styles.search}>
        <TextInput 
          placeholder='Search'
          value={search}
          onChangeText={(value) => handleChangeText('search', value)}
          style={{ width: '95%', color: styles.textColor.color }}
          placeholderTextColor={styles.textColor.color}
        />
        <Icon 
          name={search ? 'close-outline' : 'search-outline'} size={24} 
          onPress={search ? resetSearch : () => {}} 
          color={styles.textColor.color}
        />
      </View>
    </View>
  )
}
