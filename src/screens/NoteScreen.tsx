import { KeyboardAvoidingView, TextInput, ScrollView, View, Text } from 'react-native'
import BtnComponent from '../components/BtnComponent'
import ColorsComponent from '../components/ColorsComponent'
import FabComponent from '../components/FabComponent'
import FileComponent from '../components/FileComponent'
import PickerComponent from '../components/PickerComponent'
import { useComponents } from '../hooks/components/useComponents'
import { useNote } from '../hooks/screens/useNote'
import TextInputcomponent from '../components/TextInputComponent'

export default function NoteScreen(){
  const { 
    title, 
    body, 
    files, 
    options, 
    loading,
    showColors,
    styles,
    colorPicker,
    colorsData,
    refScroll,
    showCategories,
    id,
    colors,
    handleSave, 
    handleOptions, 
    handleFile, 
    handleChangeText, 
    handleGetDocument,
    handleShowColors,
    handleSelectColor,
    handleColor,
    scrollToBottom,
    handleShowPicker
  } = useNote()
  const { filesData, mediaData } = files
  const { handleSelectFile } = useComponents()

  return(
    <KeyboardAvoidingView style={{ ...styles.noteContainer, backgroundColor: colorPicker ? colorPicker : colors.background }}>
      { showColors && <ColorsComponent 
        colors={colorsData} 
        onChangeColor={handleSelectColor}
        onSelect={() => handleColor('select')}
        onCancel={() => handleColor('cancel')}
      /> }
      { showCategories && <PickerComponent onPress={handleShowPicker} /> }
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ marginBottom: 55 }}
        ref={refScroll}
        onContentSizeChange={scrollToBottom}
      >
      <View>
        <TextInputcomponent
          handleChangeText={handleChangeText} 
          value={title}
          name='title'
          editable={true}
          title='Title'
        />
      </View>
      <View>
        { mediaData.length > 0 && <FileComponent mediaData={mediaData} /> }
        { filesData.length > 0 && (
          <View style={{ alignItems: 'center' }}>
            <BtnComponent
              title={`Attchments ${filesData.length}`} 
              style={{...styles.btnContainer, marginTop: 0}} 
              textStyle={styles.btnText}
              onPress={() => handleSelectFile(0, 'file')}
            />
          </View>
          )
        }
      </View>
      <View style={{ flex: .4, marginBottom: 55 }}>
        <TextInput 
          style={styles.textArea} 
          placeholder='Body'
          onChangeText={(value) => handleChangeText('body', value)}
          value={body}
          multiline
          maxLength={1250}
          placeholderTextColor={styles.textColor.color}
        />
        {
          body.length > 200 && (
            <View style={{  justifyContent: 'flex-end', flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ marginTop: 25 }}>{ body.length }/1250</Text>
            </View>
          )
        }
      </View>
      </ScrollView>
      <FabComponent 
        icon={options ? 'close-outline' : 'menu-outline'} 
        options={options}
        showColors={showColors}
        onPress={handleOptions} 
        onPressSave={() => handleShowPicker()}
        onPressGalery={() => handleFile('galery')}
        onPressCamera={() => handleFile('camera')}
        onPressFile={handleGetDocument}
        onPressColors={handleShowColors}
        loading={loading}
      />
    </KeyboardAvoidingView>
  )
}