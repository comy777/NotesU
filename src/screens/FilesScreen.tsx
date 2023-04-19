import { useMemo } from 'react';
import { View, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import ImageZoom from '../components/ImageZoomComponent';
import useImageScreen from '../hooks/utils/useImage';

interface Props {
  uri: string
  index: number
}

export default function FilesScreen() {
  const {
    topRef,
    thumpRef,
    index,
    onPress,
    fadeAnim,
    disabled,
    setActiveIndex,
    styles,
    files
  } = useImageScreen();
  
  const FileImage = ({uri}: Props) => {
    return useMemo(() => {
      return(
        <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ImageZoom uri={uri} />
        </View>
      )
    }, [uri])
  }

  const FilesImages = ({uri, index}: Props) => {
    return useMemo(() => {
      return(
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={disabled}
          onPress={() => setActiveIndex(index)}>
          <Image
            source={{uri}}
            style={styles.imageBottomScreen}
          />
        </TouchableOpacity>
      )
    }, [uri])
  }

  return (
    <View style={styles.imageScreenBg}>
      <FlatList
        ref={topRef}
        data={files.mediaData}
        keyExtractor={(item, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialScrollIndex={index}
        onTouchStart={onPress}
        renderItem={({item}) => <FileImage uri={item.url} index={0} />}
      />
      <View style={{flex: 1, alignItems: 'center'}}>
        <Animated.FlatList
          ref={thumpRef}
          data={files.mediaData}
          keyExtractor={(item, i) => i.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          style={{position: 'absolute', bottom: 80, opacity: fadeAnim}}
          renderItem={({item, index}) => <FilesImages uri={item.url} index={index} />}
        />
      </View>
    </View>
  );
};
