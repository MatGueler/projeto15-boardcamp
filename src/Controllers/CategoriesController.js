import connection from '../dbStrategy/postgres.js'
import joi from 'joi'

export async function getCategories(req, res) {
    const { rows: categories } = await connection.query('SELECT * FROM categories')

    res.send(categories)
}

export async function postCategories(req, res) {

    const { name } = req.body
    const userSchema = joi.object({
        name: joi.string().required()
    });

    const validation = userSchema.validate(name, { abortEarly: true });

    if (validation.error) {
        console.log(validation.error.details)
        return res.status(422).send('Categoria deve possuir um nome!')
    }

    try {

        const valid = await connection.query(`SELECT * FROM categories WHERE name='${name}'`);
        if (valid.rowCount === 0) {
            await connection.query(`INSERT INTO categories (name) VALUES ('${name}')`);

            return res.status(201).send('Usuário criado!')
        }
        else {
            return res.status(400).send('Essa categoria já existe!')
        }
    }
    catch {
        res.status('Deu erro!')
    }
}

