import {SafeAreaView} from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import useZoom from '../hooks/utils/useZoom';

interface Props {
  uri: string;
}

export default function ImageZoom({uri}: Props) {
  const {styles, pinchazo, estiloImagen} = useZoom();
  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <GestureDetector gesture={pinchazo}>
          <Animated.Image
            style={[styles.img, estiloImagen]}
            source={{uri}}
          />
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};