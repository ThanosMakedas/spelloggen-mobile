import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { uppdateraSpel } from '../api'

const PLATTFORMAR = ['PC', 'PS5', 'Switch']
const STATUSAR = ['Spelar aktivt', 'Pausad', 'Slutat', 'Vill testa']

// A row of small buttons where one is chosen. Used for platform and status,
// because a dropdown would need an extra library.
function Val({ etikett, alternativ, valt, onValj }) {
  return (
    <View style={styles.falt}>
      <Text style={styles.etikett}>{etikett}</Text>
      <View style={styles.knappar}>
        {alternativ.map((a) => (
          <Pressable
            key={a}
            style={[styles.chip, a === valt && styles.chipVald]}
            onPress={() => onValj(a)}
          >
            <Text style={[styles.chipText, a === valt && styles.chipTextVald]}>{a}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

// The game to edit is sent from the detail screen.
export default function RedigeraSkarm({ route, navigation }) {
  const { spel } = route.params

  const [titel, setTitel] = useState(spel.titel)
  const [plattform, setPlattform] = useState(spel.plattform)
  const [status, setStatus] = useState(spel.status)
  const [rank, setRank] = useState(spel.rank ?? '')
  const [timmar, setTimmar] = useState(String(spel.speladeTimmar))
  const [datum, setDatum] = useState(spel.senastSpelad.slice(0, 10))
  const [anteckningar, setAnteckningar] = useState(spel.anteckningar)

  const [sparar, setSparar] = useState(false)
  const [fel, setFel] = useState(null)

  async function spara() {
    setSparar(true)
    setFel(null)

    try {
      await uppdateraSpel(spel.id, {
        titel: titel.trim(),
        plattform,
        status,
        // An empty rank is sent as null, which the API reads as "no rank".
        rank: rank.trim() || null,
        speladeTimmar: Number(timmar) || 0,
        senastSpelad: `${datum}T00:00:00`,
        anteckningar,
      })

      // Going back makes the detail screen load the game again, so it shows the new values.
      navigation.goBack()
    } catch (error) {
      setFel(error.message)
      setSparar(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.innehall}>
      {fel ? <Text style={styles.fel}>{fel}</Text> : null}

      <View style={styles.falt}>
        <Text style={styles.etikett}>Titel</Text>
        <TextInput style={styles.input} value={titel} onChangeText={setTitel} />
      </View>

      <Val etikett="Plattform" alternativ={PLATTFORMAR} valt={plattform} onValj={setPlattform} />
      <Val etikett="Status" alternativ={STATUSAR} valt={status} onValj={setStatus} />

      <View style={styles.falt}>
        <Text style={styles.etikett}>Rank</Text>
        <TextInput
          style={styles.input}
          value={rank}
          onChangeText={setRank}
          placeholder="Lämna tomt om spelet saknar rank"
          placeholderTextColor="#5b6478"
        />
      </View>

      <View style={styles.falt}>
        <Text style={styles.etikett}>Spelade timmar</Text>
        <TextInput
          style={styles.input}
          value={timmar}
          onChangeText={setTimmar}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.falt}>
        <Text style={styles.etikett}>Senast spelad</Text>
        <TextInput style={styles.input} value={datum} onChangeText={setDatum} placeholder="2026-09-28" placeholderTextColor="#5b6478" />
      </View>

      <View style={styles.falt}>
        <Text style={styles.etikett}>Anteckningar</Text>
        <TextInput
          style={[styles.input, styles.stor]}
          value={anteckningar}
          onChangeText={setAnteckningar}
          multiline
        />
      </View>

      <Pressable style={[styles.spara, sparar && styles.sparaAv]} onPress={spara} disabled={sparar}>
        <Text style={styles.sparaText}>{sparar ? 'Sparar...' : 'Spara'}</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  innehall: {
    padding: 16,
    paddingBottom: 40,
  },
  falt: {
    marginBottom: 16,
  },
  etikett: {
    marginBottom: 6,
    color: '#8b94a8',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#252c3d',
    borderRadius: 8,
    backgroundColor: '#0f1219',
    color: '#e8ecf4',
  },
  stor: {
    height: 90,
    textAlignVertical: 'top',
  },
  knappar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#252c3d',
    borderRadius: 999,
    backgroundColor: '#141824',
  },
  chipVald: {
    borderColor: '#38bdf8',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  chipText: {
    color: '#8b94a8',
  },
  chipTextVald: {
    color: '#d9f3ff',
    fontWeight: 'bold',
  },
  spara: {
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#38bdf8',
    borderRadius: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  sparaAv: {
    opacity: 0.5,
  },
  sparaText: {
    color: '#d9f3ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fel: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ff5c7a',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 92, 122, 0.1)',
    color: '#e8ecf4',
  },
})
