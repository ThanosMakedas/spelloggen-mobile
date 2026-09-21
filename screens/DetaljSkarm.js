import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { hamtaSpel } from '../api'

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

  useEffect(() => {
    hamtaSpel(id).then(setSpel)
  }, [id])

  if (!spel) {
    return (
      <View style={styles.mitten}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.innehall}>
      <Text style={styles.titel}>{spel.titel}</Text>

      <Rad etikett="Plattform" varde={spel.plattform} />
      <Rad etikett="Status" varde={spel.status} />
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
  titel: {
    marginBottom: 16,
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
