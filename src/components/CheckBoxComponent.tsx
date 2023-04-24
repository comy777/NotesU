import { View, Text } from 'react-native'
import Checkbox from 'expo-checkbox'
import { useState } from 'react';
import { CheckBoxComponentProps } from '../interfaces/components';
import { useStyles } from '../hooks/utils/useStyles';

export default function CheckBoxComponent({ category, handleChangeCategory }: CheckBoxComponentProps) {

  const [isChecked, setChecked] = useState(false)
  const { styles, colors } = useStyles()

  const handleChange = (e: boolean) => {
    setChecked(e)
    handleChangeCategory(category._id, e)
  }

  return (
    <View style={styles.section}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={handleChange} color={colors.primary} />
      <Text style={styles.paragraph}>{category.categorie}</Text>
    </View>
  )
}