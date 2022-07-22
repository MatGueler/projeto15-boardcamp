import pg from 'pg';

const { Pool } = pg;

const user = 'postgres';
const password = '123456';
const host = 'localhost';
const port = 5432;
const database = 'postgres';

const connection = new Pool({
    user,
    password,
    host,
    port,
    database
});

// const query = client.query('SELECT * FROM produtos');

// query.then(result => {
//     console.log(result.rows);
// });

export default connection;