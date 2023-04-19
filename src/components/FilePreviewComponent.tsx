import { useMemo } from 'react'
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { useComponents } from '../hooks/components/useComponents'
import { useStyles } from '../hooks/utils/useStyles'
import { FileComponentProps, FilePreviewProps } from '../interfaces/components'
import BtnComponent from './BtnComponent'

export default function FilePreviewComponent({url, onPress, type, showFile}: FilePreviewProps) {
  const { styles } = useStyles()
  const { files, handleDeleteFile } = useComponents()

  function FileAttachment({ file, index }: FileComponentProps){
    return useMemo(() => {
      return(
        <View style={styles.fileCard}>
          <TouchableOpacity activeOpacity={.7} onPress={() => showFile(file.url, file.file_name)}>
            <Text>{file.file_name}</Text>
          </TouchableOpacity>
          <Icon name='trash-outline' size={28} onPress={() => handleDeleteFile('file', index)}/>
        </View>
      )
    }, [file])
  }

  return (
    <View style={styles.modalContainer}>
      {
        type.includes('application') ? (
          <FlatList 
            data={files.filesData}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({item, index}) => <FileAttachment file={item} index={index} />}
          />
        ) : (
          <Image source={{uri: url}} style={styles.fileImage} />
        )
      }
      {
        !type.includes('application') && (
          <View style={styles.pab}>
            <View style={{ alignItems: 'center' }}>
              <BtnComponent 
                title='Ver' 
                style={styles.btnContainer} 
                textStyle={styles.btnText} 
                onPress={onPress}
              />
              <BtnComponent 
                title='Eliminar' 
                style={{}} 
                textStyle={styles.btnDanger} 
                onPress={() => handleDeleteFile('media')}
              />
            </View>
          </View>
        )
      }
    </View>
  )
}
