import { View, TextInput, FlatList, Text, Animated } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { useSearch } from '../hooks/utils/useSearch'
import CheckBoxComponent from './CheckBoxComponent'

export default function SearchComponent() {
  const { 
    search, styles, searchCategories, categories, colors, fadeAnim, handleChangeText, resetSearch, handleShowCategories, handleCategory
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
            color={colors.primary}
          />
        </View>
      </View>
      {
        (!search && searchCategories) ? (
          <Animated.View style={{...styles.searchCategories, opacity: fadeAnim}}>
            <Text>Categories</Text>
            <FlatList 
              data={categories}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <CheckBoxComponent category={item} handleChangeCategory={handleCategory} />}
              showsVerticalScrollIndicator={false}
            />
          </Animated.View>
        ) : null
      }
    </View>
  )
}
