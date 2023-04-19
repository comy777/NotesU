import { View, ScrollView, Image } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { useAccount } from '../../hooks/auth/useAccount'
import TextInputcomponent from '../../components/TextInputComponent'
import BtnComponent from '../../components/BtnComponent'

export default function Account() {
  const { user, styles, username, editUser, email, image, loading, handleChangeText, handleEdit, handleFile, handleUpdateUser } = useAccount()

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {
            user && (
              <View>
                <View style={styles.centerContent}>
                  {
                    image ? (
                      <Image source={{ uri: image }} style={styles.profilImage} />
                    ) : (
                      <Icon name='person-circle-outline' size={250} />
                    )
                  }
                  {
                    (editUser && !loading) && (
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconsContainer}>
                          <Icon name='camera-outline' size={24} color='teal' onPress={() => handleFile('camera', true)} />
                        </View>
                        <View style={styles.iconsContainer}>
                          <Icon name='image-outline' size={24} color='teal' onPress={() => handleFile('galery', true)} />
                        </View>
                      </View>
                    )
                  }
                </View>
                <TextInputcomponent
                  name='username'
                  value={username}
                  handleChangeText={handleChangeText}
                  editable={editUser}
                  title='Name'
                />
                <TextInputcomponent
                  name='email'
                  value={email}
                  handleChangeText={handleChangeText}
                  editable={false}
                  title='Email'
                />
              </View>
            )
          }
          <View style={styles.centeredView}>
            <BtnComponent
              title={editUser ? 'Update' : 'Edit'}
              style={styles.btnContainer}
              textStyle={styles.btnText}
              onPress={editUser ? handleUpdateUser : handleEdit}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
