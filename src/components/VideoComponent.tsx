import { Video, ResizeMode } from 'expo-av'
import { VideoProps } from '../interfaces/components'

export default function VideoComponent({uri}: VideoProps) {
  return (
    <Video
      source={{ uri }}
      useNativeControls
      isLooping
      style={{ height: 220, width: 350 }}
      resizeMode={ResizeMode.CONTAIN}
    />
  )
}
