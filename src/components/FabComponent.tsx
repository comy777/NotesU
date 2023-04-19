import { View, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import Lottie from 'lottie-react-native'
import { useStyles } from '../hooks/utils/useStyles'
import { FabProps } from '../interfaces/components'
import LoadingComponent from './LoadingComponent'

export default function FabComponent(props: FabProps){
  const { 
    icon,
    options,
    loading,
    onPress, 
    onPressSave, 
    onPressFile, 
    onPressCamera, 
    onPressGalery,
    onPressColors
  } = props
  const { styles } = useStyles()

  const galery = require('../lotties/gallery-icon-animation.json')
  const saveIcon = require('../lotties/save-icon-floppy-disk.json')
  const cameraIcon = require('../lotties/digital-camera.json')
  const filesIcon = require('../lotties/google-icons-google-files.json')
  const colorsIcon = require('../lotties/color-blast.json')

  return(
    <View style={options ? styles.fabAbsolute : { marginBottom: 15, marginTop: 55 }}>
      <View style={styles.fabBottom}>
        { 
          options && (
            <View>
              <TouchableOpacity activeOpacity={.7} onPress={onPressSave} disabled={loading}>
                <Lottie autoPlay source={saveIcon} style={styles.lottieContainer}/>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.7} onPress={onPressColors} disabled={loading}>
                <Lottie autoPlay source={colorsIcon} style={styles.lottieContainer}/>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.7} onPress={onPressFile} disabled={loading}>
                <Lottie autoPlay source={filesIcon} style={styles.lottieContainer}/>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.7} onPress={onPressGalery} disabled={loading}>
                <Lottie autoPlay source={galery} style={styles.lottieContainer}/>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.7} onPress={onPressCamera} disabled={loading}>
                <Lottie autoPlay source={cameraIcon} style={styles.lottieContainer}/>
              </TouchableOpacity>
            </View>
          )
        }
        <View style={options ? {...styles.fab, margin: 15 } : styles.fab}>
          {
            loading ? <LoadingComponent color='white'/> : <Icon name={icon} size={36} color='white' onPress={onPress}/>
          }
        </View>
      </View>
    </View>
  )
}