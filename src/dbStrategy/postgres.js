import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
    connectionString: 'postgres://postgres:123456@localhost:5432/boardcamp',
});

// const query = client.query('SELECT * FROM produtos');

// query.then(result => {
//     console.log(result.rows);
// });

export default connection;