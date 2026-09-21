import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { hamtaAllaSpel } from './api'

export default function App() {
  const [spel, setSpel] = useState([])
  const [laddar, setLaddar] = useState(true)

  // Runs once when the app starts.
  useEffect(() => {
    hamtaAllaSpel()
      .then(setSpel)
      .finally(() => setLaddar(false))
  }, [])

  if (laddar) {
    return (
      <View style={styles.mitten}>
        <ActivityIndicator size="large" color="#38bdf8" />
        <Text style={styles.text}>Laddar spel...</Text>
        <StatusBar style="light" />
      </View>
    )
  }

  return (
    <View style={styles.sida}>
      <Text style={styles.rubrik}>Spelloggen</Text>

      <FlatList
        data={spel}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.kort}>
            <Text style={styles.titel}>{item.titel}</Text>
            <Text style={styles.text}>
              {item.plattform} - {item.status}
            </Text>
            <Text style={styles.text}>{item.speladeTimmar} timmar</Text>
          </View>
        )}
      />

      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  sida: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#0b0d12',
  },
  mitten: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b0d12',
  },
  rubrik: {
    marginBottom: 16,
    color: '#e8ecf4',
    fontSize: 28,
    fontWeight: 'bold',
  },
  kort: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#141824',
  },
  titel: {
    marginBottom: 4,
    color: '#e8ecf4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: '#8b94a8',
  },
})
