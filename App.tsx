import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar } from 'react-native'
import { NotesProvider } from './src/context/Notescontext';
import AppRoutes from './src/routes/AppRoutes';

function AppContext({ children }: any) {
  return (
    <NotesProvider>
      {children}
    </NotesProvider>
  )
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <AppContext>
        <AppRoutes />
      </AppContext>
    </SafeAreaView>
  )
}