import { useMemo } from 'react'
import { View, Image, FlatList, TouchableOpacity } from 'react-native'
import { useComponents } from '../hooks/components/useComponents'
import { FileComponentProps, FileProps } from '../interfaces/components'
import VideoComponent from './VideoComponent'

export default function FileComponent({mediaData}: FileProps) {
  const { handleChangeFile, index, handleSelectFile } = useComponents()

  const FilePreview = ({file, index}: FileComponentProps) => {
    return useMemo(() => {
      return (
        <TouchableOpacity 
          activeOpacity={.7} 
          onPress={() => handleChangeFile(index)}
          onLongPress={() => handleSelectFile(index, 'media')}
        >
          <Image 
            source={{ uri: file.url }} 
            style={{height: 75, width: 65, marginVertical: 15, marginHorizontal: 2}} 
          />
        </TouchableOpacity>
      )
    }, [mediaData])
  }

  return (
    <View style={{ alignItems: 'center', height: 350 }}>
      {
        mediaData.length > 0 && (
          <View>
            <TouchableOpacity activeOpacity={.7} onLongPress={() => handleSelectFile(index, 'media')}>
              { (mediaData[index].type && mediaData[index].type === 'video') 
                ? ( <VideoComponent uri={mediaData[index].url} /> ) 
                : ( <Image source={{uri: mediaData[index].url}} style={{height: 250, width: 220, resizeMode: 'center'}} /> )
              }
            </TouchableOpacity>
          </View>
        )
      }
      <View>
        <FlatList 
          data={mediaData}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item, index}) => <FilePreview file={item} index={index}/> }
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}
