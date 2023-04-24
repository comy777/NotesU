import { View, TextInput, FlatList } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { useSearch } from '../hooks/utils/useSearch'
import CheckBoxComponent from './CheckBoxComponent'

export default function SearchComponent() {
  const { 
    search, styles, showCategories, categories, handleChangeText, resetSearch, handleShowCategories, handleCategory
  } = useSearch()

  return (
    <View>
      <View style={{...styles.searchContainer}}>
        <View style={styles.search}>
          <TextInput 
            placeholder='Search'
            value={search}
            onChangeText={(value) => handleChangeText('search', value)}
            style={{ width: '95%', color: styles.textColor.color }}
            placeholderTextColor={styles.textColor.color}
            onFocus={() => handleShowCategories(true)}
          />
          <Icon 
            name={search ? 'close-outline' : 'search-outline'} size={24} 
            onPress={search ? resetSearch : () => {}} 
            color={styles.textColor.color}
          />
        </View>
      </View>
      {
        (!search && showCategories) ? (
          <View style={styles.searchCategories}>
            <FlatList 
              data={categories}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <CheckBoxComponent category={item} handleChangeCategory={handleCategory} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : null
      }
    </View>
  )
}
