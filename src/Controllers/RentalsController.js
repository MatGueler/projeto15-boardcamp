import connection from '../dbStrategy/postgres.js'
import joi from 'joi'

export async function getRentals(req, res) {
    const { rows: rentals } = await connection.query(`
        SELECT * FROM rentals
    `)

    res.send(rentals)
}

export async function postRentals(req, res) {

    const { customerId, gameId, daysRented } = req.body


    const userSchema = joi.object({
        customerId: joi.number().required(),
        gameId: joi.number().required(),
        daysRented: joi.number().required()
    });

    const validation = userSchema.validate({ customerId, gameId, daysRented }, { abortEarly: true });

    if (validation.error) {
        console.log(validation.error.details)
        return res.status(422).send('Campos devem ser preenchidos corretamente!')
    }

    try {

        const validCustomer = await connection.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);

        const validGame = await connection.query(`SELECT * FROM games WHERE id=$1`, [gameId]);

        const notCustomer = validCustomer.rowCount === 0;
        const notGame = validGame.rowCount === 0;
        const invalidNumber = daysRented <= 0;

        if (notCustomer || notGame || invalidNumber) {

            return res.sendStatus(400);

        }
        else {
            const { rows: games } = await connection.query(`
            SELECT * FROM games WHERE id=$1
        `, [gameId]);

            const pricePerDay = games[0].pricePerDay
            const originalPrice = pricePerDay * daysRented

            console.log(originalPrice)

            return res.status(201).send('deubom')
        }

    }
    catch {
        res.status('Deu erro!')
    }
}

