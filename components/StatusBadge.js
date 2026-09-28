import { StyleSheet, Text, View } from 'react-native'

// The same colors as the web app, one for each status.
const farger = {
  'Spelar aktivt': '#39ff88',
  Pausad: '#ffb020',
  Slutat: '#ff3ea5',
  'Vill testa': '#38bdf8',
}

export default function StatusBadge({ status }) {
  const farg = farger[status] ?? '#8b94a8'

  return (
    <View style={[styles.badge, { borderColor: farg }]}>
      <Text style={[styles.text, { color: farg }]}>{status.toUpperCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 999,
    backgroundColor: 'rgba(11, 13, 18, 0.85)',
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
})
