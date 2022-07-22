import connection from '../dbStrategy/postgres.js'
import joi from 'joi'

export async function getGames(req, res) {
    const { rows: games } = await connection.query('SELECT * FROM games')

    res.send(games)
}

export async function postGames(req, res) {

    const { name, image, stockTotal, categoryId, pricePerDay } = req.body


    const userSchema = joi.object({
        name: joi.string().required(),
        image: joi.required(),
        stockTotal: joi.number().required(),
        categoryId: joi.number().required(),
        pricePerDay: joi.number().required()
    });

    const validation = userSchema.validate({ name, image, stockTotal, categoryId, pricePerDay }, { abortEarly: true });

    if (validation.error) {
        console.log(validation.error.details)
        return res.status(422).send('Categoria deve possuir um nome!')
    }

    // try {

    //     const valid = await connection.query(`SELECT * FROM games`);
    //     if (valid.rowCount === 0) {
    //         await connection.query(`INSERT INTO categories (name) VALUES ('${name}')`);

    //         return res.status(201).send('Usuário criado!')
    //     }
    //     else {
    //         return res.status(400).send('Essa categoria já existe!')
    //     }
    // }
    // catch {
    //     res.status('Deu erro!')
    // }

    res.send(name)
}

