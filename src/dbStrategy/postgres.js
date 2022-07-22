import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
    connectionString: 'postgres://postgres:123456@localhost:5432/boardcamp',
});

export default connection;