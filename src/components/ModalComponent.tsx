import { Modal, View } from 'react-native';
import { useComponents } from '../hooks/components/useComponents';
import { useStyles } from '../hooks/utils/useStyles';
import SettingsComponent from './SettingsComponent';
import NoteModal from './NoteModalComponent';
import FilePreviewComponent from './FilePreviewComponent';

export default function ModalComponent(){
  const { 
    modal, 
    file, 
    note,
    colorPicker, 
    handleHideModal, 
    handleConfirmDeleteNote, 
    handleNavigate, 
    handleViewFile
  } = useComponents()
  const { styles, colors } = useStyles()

  return (
    <Modal animationType="slide" transparent={true} visible={modal} onRequestClose={handleHideModal}>
      <View style={styles.centeredView}>
        <View style={{...styles.modalView, backgroundColor: note ? colorPicker : colors.modal}}>
          { 
            note  ? <NoteModal note={note} delteNote={handleConfirmDeleteNote} 
                               editNote={() => handleNavigate('note screen')}/> 
            : file ? 
              <FilePreviewComponent 
                url={file.file.url} 
                type={file.file.type ? file.file.type : 'image'} 
                onPress={() => handleViewFile('')}
                showFile={handleViewFile}
              />
            : <SettingsComponent /> 
          }
        </View>
      </View>
    </Modal>
  );
};