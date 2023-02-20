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

const db = pgp('postgres://database:UmswjUVA4XsOUepY7Cpy85h4BVG4lmb9@dpg-cfpq2ip4rebfdav58d3g-a.oregon-postgres.render.com/delivery_db?ssl=true');

module.exports = db;