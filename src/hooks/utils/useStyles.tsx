import { useTheme } from '@react-navigation/native'
import { StyleSheet, Dimensions } from 'react-native'
import { CustomTheme } from '../../interfaces/theme'

export const useStyles = () => {
  const { width } = Dimensions.get('screen')
  const { colors } = useTheme() as CustomTheme

  const styles = StyleSheet.create({
    //Header
    headerContainer: {
      height: 70,
      backgroundColor: colors.primary
    },
    header: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 25
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text
    },
    imageHeader: { height: 40, width: 40, resizeMode: 'center', borderRadius: 20 },

    //Main
    container: {
      flex: 1,
      marginVertical: 15,
      marginHorizontal: 10,
      backgroundColor: colors.background
    },
    textCenter: { textAlign: 'center' },
    pab: { position: 'absolute', bottom: 0, right: 0, left: 0 },
    contentEvenly: { flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 15 },
    textColor: { color: colors.text },

    //Modal
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: colors.modal,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: { borderRadius: 20, padding: 10, elevation: 2 },
    buttonOpen: { backgroundColor: '#F194FF' },
    buttonClose: { backgroundColor: '#2196F3' },
    textStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
    modalText: { marginBottom: 15, textAlign: 'center' },

    //Settings
    settings: { height: 250, width: 250 },
    iconsBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 25
    },

    //Fab
    fabBottom: { position: 'absolute', right: 0, bottom: 0, margin: 5 },
    fabAbsolute: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      top: 0
    },
    fab: {
      height: 65,
      width: 65,
      borderRadius: 32.5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.accent
    },
    lottieContainer: {
      height: 50,
      width: 50,
      borderRadius: 25,
      marginLeft: 15,
      marginTop: 5
    },

    //Note
    input: {
      height: 70,
      width: '100%',
      paddingHorizontal: 15,
      alignItems: 'center',
      marginBottom: 15,
      color: colors.text
    },
    lineBottom: { borderBottomWidth: .3, width: '100%', borderBottomColor: 'black'},
    textArea: { flex: 1, paddingHorizontal: 15, color: colors.text },
    noteContainer: { flex: 1, padding: 15 },

    //Note Component
    cardNote: {
      height: 250,
      width: width / 2 - 25,
      backgroundColor: 'teal',
      borderRadius: 15,
      margin: 5,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    //FilePreview
    modalContainer: { height: 450, width: 275 },
    fileImage: { height: 250, width: 250, resizeMode: 'center' },

    //Btn
    btnContainer: { 
      height: 50, 
      width: 250, 
      backgroundColor: colors.accent, 
      borderRadius: 15, 
      justifyContent: 'center', 
      alignItems: 'center',
      marginVertical: 15
    },
    btnText: {color: 'white', fontWeight: 'bold'},
    btnDanger: { color: 'red' },

    img: { height: width, width, resizeMode: 'center' },
    imageScreenBg: { flex: 1, backgroundColor: colors.background },
    imageBottomScreen: {
      height: 80,
      width: 80,
      marginRight: 10,
      borderRadius: 12,
    },

    //FileCard
    fileCard: {
      height: 70,
      width: '100%',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 15
    },

    //Auth
    inputAuth: {
      height: 70,
      width: '100%',
      borderWidth: 1,
      borderColor: 'teal',
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 15
    },
    
    //Colors
    containerColors: { 
      position: 'absolute', 
      top: 0, 
      bottom: 0, 
      right: 0, 
      left: 0, 
      backgroundColor: 'rgba(0, 0, 0, .7)',
      zIndex: 99999
    },
    modalColors: { height: 450, width: 375, backgroundColor: 'teal',  borderRadius: 25, paddingVertical: 25 },
    marginColorContainer: { flex: 1, margin: 15 },
    cardColor: { height: 60, width: 60, borderRadius: 30, margin: 7, justifyContent: 'center', alignItems: 'center' },

    //Search
    searchContainer: {
      height: 60, 
      width: '100%', 
      borderWidth: .4, 
      borderColor: 'gray', 
      borderRadius: 25, 
      justifyContent:'center',
      marginBottom: 25
    },
    search: { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25 },
    searchCategories: { 
      padding: 15,
      backgroundColor: colors.accent,
      borderRadius: 15
    },

    //Checkbox
    checkbox: {
      margin: 8,
      borderColor: colors.primary
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paragraph: {
      fontSize: 15,
    },

    //Picker
    pickerItem: { width: 250, height: 60, marginTop: 15, backgroundColor: colors.pickerItem },

    //Input float
    containerInputFloat: {
      marginTop: 20,
      paddingTop: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#bdbdbd',
      borderRadius: 4,
      width: '100%',
      alignSelf: 'center'
    },
    inputFloat: {
      height: 50,
      color: colors.text
    },
    labelFloat: {
      color: colors.text,
      fontSize: 10
    },
    animatedStyle: {
      top: 5,
      left: 15,
      position: 'absolute',
      borderRadius: 90,
      zIndex: 10000,
    },
    animatedTop: {
      top: 12,
      left: 5,
      position: 'absolute',
      borderRadius: 90,
      zIndex: 10000,
      paddingHorizontal: 5,
    },

    //Account settings
    centerContent: { justifyContent: 'center', alignItems: 'center' },
    profilImage: { height: 250, width: 250, borderRadius: 125, resizeMode: 'center', marginVertical: 25 },
    iconsContainer: { padding: 5, borderRadius: 15, borderWidth: 1, borderColor: 'teal', marginHorizontal: 5 },

    //Welcome screen
    centerFlex: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    contetntWelcome: { width, flex: 1, justifyContent: 'center', alignItems: 'center' },
    btnWelcome: { position: 'absolute', bottom: 75 },
    titleWelcome: { fontSize: 38, fontWeight: 'bold', color: colors.text },
    bodyWelcome: { fontSize: 24, color: colors.text, marginTop: 15, marginHorizontal: 25 }

  })

  return { styles, width, colors }
}