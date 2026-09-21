// Every call to the API is in this file, so there is one place to look.
import Constants from 'expo-constants'

// The phone cannot use localhost, because localhost would mean the phone itself.
// Expo already knows the computer's address on the Wi-Fi, since the app is loaded
// from there, so we take that address and add the port the API runs on.
const dator = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost'

export const API_URL = `http://${dator}:5080`

export async function hamtaAllaSpel() {
  const svar = await fetch(`${API_URL}/api/spel`)

  if (!svar.ok) {
    throw new Error('API:et svarade med ett fel.')
  }

  return svar.json()
}

export async function hamtaSpel(id) {
  const svar = await fetch(`${API_URL}/api/spel/${id}`)

  if (!svar.ok) {
    throw new Error('Spelet hittades inte.')
  }

  return svar.json()
}
