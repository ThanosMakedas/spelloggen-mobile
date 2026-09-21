import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { hamtaAllaSpel } from '../api'

// navigation is given to every screen in the stack. It is what opens another screen.
export default function ListaSkarm({ navigation }) {
  const [spel, setSpel] = useState([])
  const [laddar, setLaddar] = useState(true)

  // Runs once, when the screen is shown the first time.
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
      </View>
    )
  }

  return (
    <FlatList
      data={spel}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.innehall}
      renderItem={({ item }) => (
        <Pressable
          style={styles.kort}
          onPress={() => navigation.navigate('Detaljer', { id: item.id, titel: item.titel })}
        >
          <Text style={styles.titel}>{item.titel}</Text>
          <Text style={styles.text}>
            {item.plattform} - {item.status}
          </Text>
          <Text style={styles.text}>{item.speladeTimmar} timmar</Text>
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  innehall: {
    padding: 16,
  },
  mitten: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
