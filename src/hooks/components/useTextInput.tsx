import { useState, useRef, useEffect } from 'react'
import { Animated } from 'react-native'
import { useStyles } from '../utils/useStyles';
import { useContextApp } from '../context/useContextApp';

export const useTextInput = (value: string) => {
  const [show, setShow] = useState(false)
  const moveText = useRef(new Animated.Value(0)).current;
  const { styles, colors } = useStyles()
  const { colorPicker } = useContextApp()

  const onFocusHandler = () => {
    if (!value) {
      if (!show) setShow(true)
      moveTextTop();
    }
  };

  const onBlur = () => {
    if (!value) {
      if (show) setShow(false)
      moveTextBottom();
    }
  };

  const onChangeText = (textValue: string) => {
    if (textValue !== '') {
      setShow(true)
      moveTextTop();
    } // else if (value === '') {
    //   moveTextBottom();
    // }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });

  const animStyle = {
    transform: [{ translateY: yVal }],
  };

  useEffect(() => {
    onChangeText(value)
  }, [value])
  

  return {
    show,
    value,
    styles,
    animStyle,
    colorPicker,
    colors,
    onBlur,
    onFocusHandler,
    onChangeText
  }
}