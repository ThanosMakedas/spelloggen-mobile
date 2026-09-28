import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { bildUrl, hamtaSpel } from '../api'
import Felmeddelande from '../components/Felmeddelande'
import StatusBadge from '../components/StatusBadge'

// One line with a label and a value, used a few times below.
function Rad({ etikett, varde }) {
  return (
    <View style={styles.rad}>
      <Text style={styles.etikett}>{etikett}</Text>
      <Text style={styles.varde}>{varde}</Text>
    </View>
  )
}

// route.params holds what the list screen sent when it opened this screen.
export default function DetaljSkarm({ route }) {
  const { id } = route.params
  const [spel, setSpel] = useState(null)
  const [fel, setFel] = useState(null)

  function hamta() {
    setFel(null)

    hamtaSpel(id)
      .then(setSpel)
      .catch((error) => setFel(error.message))
  }

  useEffect(() => {
    hamta()
  }, [id])

  if (fel) {
    return <Felmeddelande meddelande={fel} onForsokIgen={hamta} />
  }

  if (!spel) {
    return (
      <View style={styles.mitten}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.innehall}>
      <View style={styles.omslag}>
        {bildUrl(spel) ? (
          <Image source={bildUrl(spel)} style={styles.bild} contentFit="cover" transition={200} />
        ) : (
          <View style={styles.ingenBild}>
            <Text style={styles.ingenBildText}>INGEN BILD</Text>
          </View>
        )}
      </View>

      <View style={styles.rubrikrad}>
        <Text style={styles.titel}>{spel.titel}</Text>
        <StatusBadge status={spel.status} />
      </View>

      <Rad etikett="Plattform" varde={spel.plattform} />
      {/* Rank can be empty in the database, so show a text instead of nothing. */}
      <Rad etikett="Rank" varde={spel.rank ?? 'Ingen rank'} />
      <Rad etikett="Spelade timmar" varde={`${spel.speladeTimmar} timmar`} />
      <Rad etikett="Senast spelad" varde={spel.senastSpelad.slice(0, 10)} />

      {spel.anteckningar ? <Text style={styles.anteckningar}>{spel.anteckningar}</Text> : null}
    </ScrollView>
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
  omslag: {
    aspectRatio: 16 / 9,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#07080d',
    overflow: 'hidden',
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
  rubrikrad: {
    marginBottom: 12,
    gap: 10,
  },
  titel: {
    color: '#e8ecf4',
    fontSize: 24,
    fontWeight: 'bold',
  },
  rad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#252c3d',
    borderBottomWidth: 1,
  },
  etikett: {
    color: '#8b94a8',
  },
  varde: {
    color: '#e8ecf4',
    fontWeight: 'bold',
  },
  anteckningar: {
    marginTop: 16,
    color: '#8b94a8',
    fontSize: 15,
    lineHeight: 22,
  },
})
