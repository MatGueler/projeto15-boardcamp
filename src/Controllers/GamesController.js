import connection from '../dbStrategy/postgres.js'
import joi from 'joi'

export async function getGames(req, res) {
    const { rows: games } = await connection.query(`
        SELECT games.*,categories.name as "categoryName" FROM games
        JOIN categories
        ON games."categoryId" = categories.id
    `)

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

    try {

        const valid = await connection.query(`SELECT * FROM games WHERE name=$1`, [name]);

        if (valid.rowCount === 0) {
            await connection.query(`
            INSERT INTO games (name,image, "stockTotal", "categoryId", "pricePerDay") VALUES ('${name}','${image}','${stockTotal}','${categoryId}','${pricePerDay}')
            `);

            return res.status(201).send('criado')

        }
        else {
            return res.status(400).send('Esse jogo já existe!')
        }

    }
    catch {
        res.status('Deu erro!')
    }
}

