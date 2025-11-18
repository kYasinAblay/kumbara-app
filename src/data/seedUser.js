import { supabase } from '../supabaseClient';

export async function seedUser() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', 'demo@example.com');

  if (!data || data.length === 0) {
    await supabase.from('users').insert([
      {
        name: 'Demo User',
        email: 'demo@example.com',
        password: '123456',
      },
    ]);
    console.log('✅ Seed user created!');
  } else {
    console.log('ℹ️ User already exists.');
  }
}
