import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import ListaSkarm from './screens/ListaSkarm'

// A stack works like a pile of paper: the list is at the bottom, and other
// screens are placed on top of it. The back button comes for free.
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0b0d12' },
          headerTintColor: '#e8ecf4',
          contentStyle: { backgroundColor: '#0b0d12' },
        }}
      >
        <Stack.Screen name="Lista" component={ListaSkarm} options={{ title: 'Spelloggen' }} />
      </Stack.Navigator>

      <StatusBar style="light" />
    </NavigationContainer>
  )
}
