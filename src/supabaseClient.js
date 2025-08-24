import { createClient } from '@supabase/supabase-js'

// Pak alle gangbare env namen (Blink/Next/Vite)
// Support Node env and Vite/Next import.meta.env without throwing during dev
const getEnv = () => {
  const fromProcess = {
    SUPABASE_URL: (process && process.env && (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL)) || '',
    SUPABASE_ANON_KEY: (process && process.env && (process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY)) || ''
  }

  // Prefer process.env; build-time env (Vite) injects VITE_ or NEXT_PUBLIC_ vars into process.env at build time in our environment
  const urlVal = (fromProcess.SUPABASE_URL || '')
  const keyVal = (fromProcess.SUPABASE_ANON_KEY || '')

  return { url: (urlVal || '').trim(), key: (keyVal || '').trim() }
}

const { url, key } = getEnv()

let _supabase = null
if (url && key) {
  _supabase = createClient(url, key)
} else {
  // Create a lightweight mock that surfaces helpful errors when used
  _supabase = {
    from() {
      throw new Error('Supabase client not configured. Add SUPABASE_URL and SUPABASE_ANON_KEY to secrets.')
    },
    auth: {
      getUser: async () => ({ data: { user: null }, error: new Error('Supabase auth not configured') })
    }
  }
}

export const supabase = _supabase

export async function testConnection() {
  try {
    const { data, error } = await supabase.from('checklists').select('*').limit(1)
    if (error) return 'Error: ' + error.message
    return 'Connectie werkt! ' + JSON.stringify(data ?? [])
  } catch (err) {
    return 'Error: ' + (err?.message ?? String(err))
  }
}

export async function insertTest() {
  try {
    const { data: { user }, error: uerr } = await supabase.auth.getUser()
    if (uerr || !user) return 'Error: niet ingelogd'

    const taken = [
      { text: 'Welkomsgesprek', done: false },
      { text: 'Rondleiding', done: false }
    ]

    const { data, error } = await supabase
      .from('checklists')
      .insert({
        gebruiker_id: user.id,
        functie: 'Testfunctie',
        startdatum: '2025-08-24',
        taken
      })
      .select()
      .limit(1)

    if (error) return 'Error: ' + error.message
    return 'Insert gelukt! ' + JSON.stringify(data ?? [])
  } catch (err) {
    return 'Error: ' + (err?.message ?? String(err))
  }
}
