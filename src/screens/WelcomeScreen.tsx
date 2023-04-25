import { View, FlatList, Animated, Text, TouchableOpacity } from 'react-native';
import Lottie from 'lottie-react-native'
import { useWelcome } from '../hooks/screens/useWelcome';
import { SafeAreaView } from 'react-native';
import { DataWelcome } from '../interfaces/components';
import BtnComponent from '../components/BtnComponent';

export default function WelcomeScreen() {
  const { topRef, styles, data, handleWelcome, setActiveIndex } = useWelcome();
  const nextIcon = require('../lotties/next.json')

  const FileImage = ({ background, title, body, index }: DataWelcome) => {
    return (
      <View
        style={{ ...styles.centerFlex, backgroundColor: background }}>
        <SafeAreaView>
          <Animated.View style={styles.contetntWelcome}>
            <Text style={styles.titleWelcome}>{title}</Text>
            <Text style={styles.bodyWelcome}>{body}</Text>
            <View style={styles.btnWelcome}>
              {
                index === 2
                  ? <BtnComponent title='Start' style={styles.btnContainer} textStyle={styles.btnText} onPress={() => handleWelcome()} />
                  : <TouchableOpacity onPress={() => setActiveIndex(index + 1)} activeOpacity={.7}>
                    <Lottie source={nextIcon} autoPlay loop style={{ height: 250, width: 250 }} />
                  </TouchableOpacity>
              }
            </View>
          </Animated.View>
        </SafeAreaView>
      </View>
    )
  }

  return (
    <View style={styles.imageScreenBg}>
      <FlatList
        ref={topRef}
        data={data}
        keyExtractor={(item, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialScrollIndex={0}
        renderItem={({ item, index }) => <FileImage {...item} index={index} />}
      />
    </View>
  );
};
