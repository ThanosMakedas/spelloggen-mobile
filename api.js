// Every call to the API is in this file, so there is one place to look.
import Constants from 'expo-constants'
import { Platform } from 'react-native'

// The phone cannot use localhost, because localhost would mean the phone itself.
// Expo already knows the computer's address on the Wi-Fi, since the app is loaded
// from there, so we take that address and add the port the API runs on.
let dator = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost'

// An Android emulator is its own little machine, so localhost means the emulator.
// 10.0.2.2 is the address the emulator uses for the computer it runs on.
if (Platform.OS === 'android' && (dator === 'localhost' || dator === '127.0.0.1')) {
  dator = '10.0.2.2'
}

export const API_URL = `http://${dator}:5080`

// Both calls below go through this one, so the error messages are the same everywhere.
async function hamta(vag) {
  let svar

  try {
    svar = await fetch(`${API_URL}${vag}`)
  } catch {
    // fetch only fails like this when no answer came back at all,
    // which is what happens when the API is not running.
    throw new Error(`Kunde inte nå API:et på ${API_URL}. Är det startat?`)
  }

  if (!svar.ok) {
    throw new Error(`API:et svarade med fel ${svar.status}.`)
  }

  return svar.json()
}

export function hamtaAllaSpel() {
  return hamta('/api/spel')
}

export function hamtaSpel(id) {
  return hamta(`/api/spel/${id}`)
}

// The API stores paths like "/uploads/pubg.svg", so the address has to be put in front.
export function bildUrl(spel) {
  return spel.bildUrl ? `${API_URL}${spel.bildUrl}` : null
}
