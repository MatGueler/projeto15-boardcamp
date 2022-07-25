import connection from '../dbStrategy/postgres.js'
import joi from 'joi'

export async function getCustomers(req, res) {

    let { cpf } = req.query

    if (cpf) {

        cpf = cpf.toLowerCase()

        const { rows: customers } = await connection.query(`
            SELECT * FROM customers
            WHERE lower(customers.cpf) LIKE $1
            `, [cpf + "%"])

        return res.send(customers)
    }
    else {
        const { rows: customers } = await connection.query(`
            SELECT * FROM customers
        `)
        return res.send(customers)
    }
}

export async function getCustomersId(req, res) {

    const { id } = req.params

    const { rows: customers } = await connection.query('SELECT * FROM customers WHERE id=$1', [id])

    if (customers[0]) {
        return res.send(customers[0])
    }
    else {
        return res.send(400)
    }
}

export async function postCustomers(req, res) {

    const { name, phone, cpf, birthday } = req.body


    const userSchema = joi.object({
        name: joi.string().required(),
        phone: joi.string().required().pattern((/^[0-9]{10,11}$/)),
        cpf: joi.string().required().pattern((/^[0-9]{11}$/)),
        birthday: joi.string().required()
    });

    const validation = userSchema.validate({ name, phone, cpf, birthday }, { abortEarly: true });

    if (validation.error) {
        console.log(validation.error.details)
        return res.status(422).send('Dados incorretos!')
    }

    try {

        const valid = await connection.query(`SELECT * FROM customers WHERE cpf = '${cpf}'`);
        if (valid.rowCount === 0) {
            await connection.query(`INSERT INTO customers(

            name, phone, cpf, birthday

        ) VALUES(

            '${name}', '${phone}', '${cpf}', '${birthday}'

        )`);

            return res.status(201).send('Usuário criado!')
        }
        else {
            return res.status(409).send('cpf já existente!')
        }
    }
    catch {
        res.status('Deu erro!')
    }
}

export async function updateCustomers(req, res) {

    const { name, phone, cpf, birthday } = req.body

    const { id } = req.params


    const userSchema = joi.object({
        name: joi.string().required(),
        phone: joi.string().required().pattern((/^[0-9]{10,11}$/)),
        cpf: joi.string().required().pattern((/^[0-9]{11}$/)),
        birthday: joi.string().required()
    });

    const validation = userSchema.validate({ name, phone, cpf, birthday }, { abortEarly: true });

    if (validation.error) {
        console.log(validation.error.details)
        return res.status(422).send('Dados incorretos!')
    }

    try {

        const valid = await connection.query(`SELECT * FROM customers WHERE cpf = '${cpf}'`);
        if (valid.rowCount === 0) {
            await connection.query(`

            UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;
    `, [name, phone, cpf, birthday, id])

            return res.status(201).send('Usuário atualizado!')
        }
        else {
            return res.status(409).send('cpf já existente!')
        }
    }
    catch {
        res.status('Deu erro!')
    }
}