import { Pressable, StyleSheet, Text, View } from 'react-native'

// Shown instead of an empty screen when a call to the API fails.
export default function Felmeddelande({ meddelande, onForsokIgen }) {
  return (
    <View style={styles.ruta}>
      <Text style={styles.rubrik}>Något gick fel</Text>
      <Text style={styles.text}>{meddelande}</Text>

      <Pressable style={styles.knapp} onPress={onForsokIgen}>
        <Text style={styles.knappText}>Försök igen</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  ruta: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ff5c7a',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 92, 122, 0.1)',
  },
  rubrik: {
    marginBottom: 6,
    color: '#ff5c7a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 14,
    color: '#e8ecf4',
    lineHeight: 20,
  },
  knapp: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#38bdf8',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  knappText: {
    color: '#d9f3ff',
    fontWeight: 'bold',
  },
})
