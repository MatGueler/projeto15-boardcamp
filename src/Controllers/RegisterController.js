import connection from '../dbStrategy/postgres.js'

export async function registerUser(req, res) {
    const { rows: users } = await connection.query('SELECT * FROM users')

    console.log(users);

    res.send('deubom')

}