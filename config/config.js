const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

// Configuración de la base de datos Supabase PostgreSQL
// Obtén la cadena de conexión desde: https://app.supabase.com
// Ve a: Project Settings -> Database -> Connection String (URI mode)
const databaseUrl = process.env.SUPABASE_DATABASE_URL;

const db = pgp(databaseUrl);

module.exports = db;