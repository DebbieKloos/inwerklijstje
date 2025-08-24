import { createClient } from '@supabase/supabase-js';

const url  = import.meta.env.VITE_SUPABASE_URL || '';
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase;
if (url && anon) {
  supabase = createClient(url, anon);
} else {
  // Minimal stub zodat de app niet crasht als secrets ontbreken
  supabase = {
    from() {
      return {
        select: async () => ({ data: null, error: new Error('Supabase niet geconfigureerd') }),
        insert: async () => ({ data: null, error: new Error('Supabase niet geconfigureerd') }),
      };
    },
    auth: {
      getUser: async () => ({ data: { user: null }, error: new Error('Supabase auth niet geconfigureerd') }),
    },
  };
  console.warn('Voeg VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY toe aan Secrets (Blink).');
}

export default supabase;
