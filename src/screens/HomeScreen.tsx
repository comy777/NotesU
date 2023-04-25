import { View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import FabComponent from '../components/FabComponent'
import LoadingComponent from '../components/LoadingComponent'
import { useHome } from '../hooks/screens/useHome'
import NoteComponent from '../components/NoteComponent'
import SearchComponent from '../components/SearchComponent'

export default function HomeScreen() {
  const { loading, notes, styles, select, handleNavigateNote, handleShowNote, handleSelect, hideCategories } = useHome()
  
  if(loading) return <LoadingComponent color='teal'/>

  return (
    <View style={styles.container}>
      { notes.length > 0 ? <SearchComponent/> : null }
      <FlashList 
        data={notes}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item, index}) => <NoteComponent note={item} onPress={handleShowNote} onSelect={handleSelect} index={index}/>}
        estimatedItemSize={200}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onTouchStart={() => hideCategories()}
      />
      <FabComponent icon={select ? 'trash-outline' : 'add'} onPress={handleNavigateNote}/>
    </View>
  )
}