import connection from '../dbStrategy/postgres.js'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import joi from 'joi'

export async function getRentals(req, res) {

    let queryCustomer = req.query.customerId

    if (queryCustomer) {

        queryCustomer = queryCustomer.toLowerCase();

        const { rows: rentals } = await connection.query(`
            SELECT rentals.*,customers.name as "nameCustomer",games.id as "idGame",games.name,games."categoryId", categories.name as "categoryName" FROM rentals
            JOIN customers
            ON customers.id = rentals."customerId"
            JOIN games
            ON games.id = rentals."gameId"
            JOIN categories
            ON categories.id = games."categoryId"     
`)

        const newRentals = rentals.map((item) => {

            const rentalsComplete = {
                ...item,
                customer: {
                    id: item.customerId,
                    name: item.nameCustomer
                },
                game: {
                    id: item.idGame,
                    name: item.name,
                    categoryId: item.categoryId,
                    categoryName: item.categoryName
                }
            }

            delete rentalsComplete.idGame;
            delete rentalsComplete.name;
            delete rentalsComplete.categoryId;
            delete rentalsComplete.categoryName;
            delete rentalsComplete.nameCustomer;

            return rentalsComplete
        })

        return res.send(newRentals)
    }
    else {
        const { rows: rentals } = await connection.query(`
            SELECT rentals.*,customers.name as "nameCustomer",games.id as "idGame",games.name,games."categoryId", categories.name as "categoryName" FROM rentals
            JOIN customers
            ON customers.id = rentals."customerId"
            JOIN games
            ON games.id = rentals."gameId"
            JOIN categories
            ON categories.id = games."categoryId"
`)

        const newRentals = rentals.map((item) => {

            const rentalsComplete = {
                ...item,
                customer: {
                    id: item.customerId,
                    name: item.nameCustomer
                },
                game: {
                    id: item.idGame,
                    name: item.name,
                    categoryId: item.categoryId,
                    categoryName: item.categoryName
                }
            }

            delete rentalsComplete.idGame;
            delete rentalsComplete.name;
            delete rentalsComplete.categoryId;
            delete rentalsComplete.categoryName;
            delete rentalsComplete.nameCustomer;

            return rentalsComplete
        })



        return res.send(newRentals)
    }
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
        const { rows: games } = await connection.query(`
            SELECT * FROM games WHERE id=$1
        `, [gameId]);

        const pricePerDay = games[0].pricePerDay
        const originalPrice = pricePerDay * daysRented
        const rentDate = dayjs().format('YYYY-MM-DD')

        await connection.query(`
        INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","originalPrice")
        VALUES (${customerId},${gameId},'${rentDate}',${daysRented},${originalPrice})`);

        return res.send(201)

    }
    catch {
        res.status('Deu erro!')
    }
}

export async function finishRentals(req, res) {

    const id = req.params.id

    dayjs.extend(relativeTime)

    try {
        const { rows: rentals } = await connection.query(`
            SELECT * FROM rentals
            WHERE rentals.id = $1
            `, [id])

        let a = dayjs().from(dayjs('2022-06-01'), true)
        console.log((a))

        return res.sendStatus(200)
    }
    catch {
        return res.sendStatus(400)
    }
}

export async function deleteRentals(req, res) {


    const { id } = req.params

    const { rows: deleteId } = await connection.query(`
            DELETE FROM rentals
            WHERE id=$1
`, [id])

    res.send(deleteId)
}

