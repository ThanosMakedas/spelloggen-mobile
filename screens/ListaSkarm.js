import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { bildUrl, hamtaAllaSpel } from '../api'
import StatusBadge from '../components/StatusBadge'

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
          <View style={styles.omslag}>
            {bildUrl(item) ? (
              <Image source={bildUrl(item)} style={styles.bild} contentFit="cover" transition={200} />
            ) : (
              // The game has no cover image, which is allowed, so show a text instead.
              <View style={styles.ingenBild}>
                <Text style={styles.ingenBildText}>INGEN BILD</Text>
              </View>
            )}

            <View style={styles.badge}>
              <StatusBadge status={item.status} />
            </View>
          </View>

          <View style={styles.text}>
            <Text style={styles.titel}>{item.titel}</Text>
            <Text style={styles.info}>
              {item.plattform} - {item.speladeTimmar} timmar
            </Text>
          </View>
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
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#252c3d',
    backgroundColor: '#141824',
    overflow: 'hidden',
  },
  omslag: {
    aspectRatio: 16 / 9,
    backgroundColor: '#07080d',
  },
  bild: {
    width: '100%',
    height: '100%',
  },
  ingenBild: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingenBildText: {
    color: '#8b94a8',
    fontSize: 12,
    letterSpacing: 1,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  text: {
    padding: 14,
  },
  titel: {
    marginBottom: 4,
    color: '#e8ecf4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    color: '#8b94a8',
  },
})
