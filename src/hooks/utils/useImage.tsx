import { LegacyRef, useState, useRef, useEffect } from 'react';
import {FlatList} from 'react-native';
import useAnimation from './useAnimation';
import { useContextApp } from '../context/useContextApp';
import { useStyles } from './useStyles';

const IMAGE_SIZE = 80;
const SPACING = 10;

const useImageScreen = () => {
  const { files, file } = useContextApp()
  const [index, setIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const thumpRef: LegacyRef<FlatList> = useRef(null);
  const topRef: LegacyRef<FlatList> = useRef(null);
  const timmerImages = useRef(false);
  const { fadeAnim, fadeIn, fadeOut } = useAnimation();
  const { width, styles, colors } = useStyles();

  const getIndex = () => {
    files.mediaData.forEach((item, index) => {
      if(file){
        if (file.file.url) {
          if (item.url === file.file.url) setIndex(index);
        }
      }
    });
  };

  const onPress = () => {
    fadeIn();
    timmerImages.current = true;
    setDisabled(false);
  };

  const timmer = (duration: number) => {
    setTimeout(() => {
      fadeOut();
      setDisabled(true);
      timmerImages.current = false;
    }, duration);
  };

  const setActiveIndex = (index: number) => {
    if (topRef.current) {
      topRef.current.scrollToOffset({
        offset: index * width,
        animated: true,
      });
    }
    if (!thumpRef.current) return;
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumpRef.current.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    }
  };

  useEffect(() => {
    getIndex();
  }, []);

  return {
    index,
    disabled,
    thumpRef,
    topRef,
    fadeAnim,
    onPress,
    setActiveIndex,
    styles,
    files,
    colors
  };
};

export default useImageScreen;
