import connection from '../dbStrategy/postgres.js'

export async function registerUser(req, res) {
    const { rows: users } = await connection.query('SELECT * FROM categories')

    res.send(users)

}