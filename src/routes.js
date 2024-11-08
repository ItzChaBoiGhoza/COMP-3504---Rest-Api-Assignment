"use strict";

module.exports.register = (app, database) => {

    app.get('/', async (req, res) => {
        res.status(200).send("This is running!").end();
    });

    app.get('/api/items', async (req, res) => {
        const item_name = req.query.item_name;

       try {
        let records;

        if(item_name) {
            records = await database.query('SELECT * FROM items WHERE item_name = ?', [item_name]);
        } else {
            records = await database.query('SELECT id, item_name FROM items');
        }
        res.status(200).send(JSON.stringify(records)).end();
       } catch (e) {
        res.status(500).send('Error occured while trying to retrieve items from database');
       }
    });

    app.get('/api/items/:id', async (req, res) => {
        const id = req.params.id;

        try {
            const records = await database.query('SELECT * FROM items WHERE id = ?', [id]);
            res.status(200).send(JSON.stringify(records)).end();
        } catch (e) {
            res.status(500).send('Error occured while trying to retrieve items from database');
        }
    })

    app.get('/api/suppliers', async (req, res) => {
        let query;
        query = database.query('SELECT id, supplier_name FROM suppliers');

        const records = await query;

        res.status(200).send(JSON.stringify(records)).end();
    })

};
