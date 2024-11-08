"use strict";

module.exports.register = (app, database) => {

    app.get('/', async (req, res) => {
        res.status(200).send("This is running!").end();
    });

    app.get('/api/items', async (req, res) => {
        let query;
        query = database.query('SELECT * FROM items');

        const records = await query;

        res.status(200).send(JSON.stringify(records)).end();
    });

    app.get('/api/suppliers', async (req, res) => {
        let query;
        query = database.query('SELECT * FROM suppliers');

        const records = await query;

        res.status(200).send(JSON.stringify(records)).end();
    })

};
