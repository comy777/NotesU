import { View, TextInput, Text, Animated } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons'
import { useTextInput } from '../hooks/components/useTextInput';
import { InputFloatProps } from '../interfaces/components';

export default function TextInputcomponent(
  { value, name, editable, password, handleChangeText, title, setShow, showPassword }: InputFloatProps) 
  {
  const { show, styles, animStyle, colorPicker, colors, onBlur, onFocusHandler } = useTextInput(value)

  return (
    <View style={styles.containerInputFloat}>
      <Animated.View
        style={
          [show ? styles.animatedTop : styles.animatedStyle, animStyle,
          { backgroundColor: colorPicker ? colorPicker : colors.background }
          ]
        }
      >
        <Text style={styles.labelFloat}>{title}</Text>
      </Animated.View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextInput
          editable={editable}
          value={value}
          onBlur={onBlur}
          style={{...styles.inputFloat, width: '90%'}}
          onFocus={onFocusHandler}
          onChangeText={(v) => handleChangeText(name, v)}
          secureTextEntry={password}
        />
        {
          showPassword ? <Icon name={password ? 'eye-outline' : 'eye-off-outline'} size={24} onPress={setShow} /> : null
        }
      </View>
    </View>
  );
};