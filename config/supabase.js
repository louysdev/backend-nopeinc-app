const { createClient } = require('@supabase/supabase-js');

// Obtén estas credenciales desde tu proyecto en https://app.supabase.com
// Project Settings -> API
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️  ADVERTENCIA: Las credenciales de Supabase no están configuradas.');
    console.warn('   Configura SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en tu archivo .env');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

module.exports = supabase;
