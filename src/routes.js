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

    app.post('/api/items', async (req, res) => {
        const {item_name, quantity, price, supplier_id, supplier_price} = req.body;
        
        try {
            const query = 'INSERT INTO items (item_name, quantity, price, supplier_id, supplier_price) VALUES (?,?,?,?,?)';
            const result = await database.query(query, [item_name, quantity, price, supplier_id, supplier_price]);

            res.status(201).json({id: result.insertId, item_name, quantity, price, supplier_id, supplier_price});
        } catch(e) {
            res.status(500).json({message: "Item is not successfully added to the database"});
        }
    })

    app.put('/api/items', async (req, res) => {
        const id = req.query.id;
        const {quantity} = req.body;

        try {
            const query = 'UPDATE items SET quantity = ? WHERE id = ?';
            const result = await database.query(query, [quantity, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({error: "Item not found"});
            }

            res.status(200).json({message: "Item's quantity have been updated!"});
        } catch(e) {
            res.status(500).json({message: "Unable to update item's quantity"});
        }
    })

    app.delete('/api/items', async (req, res) => {
        const id = req.query.id;

        try {
            const result = await database.query('DELETE FROM items WHERE id = ?', [id]);
            
            if(result.affectedRows === 0) {
                return res.status(404).json({message: "Item not found"});
            }

            res.status(200).json({message: "Item deleted successfully"});
        } catch(e) {
            res.status(500).json({message: "Item not found"});
        }
    })

    app.get('/api/suppliers', async (req, res) => {
        const supplier_name = req.query.supplier_name;
        
        try {
            let records;

            if(supplier_name) {
                records = database.query('SELECT * FROM suppliers WHERE supplier_name = ?', [supplier_name]);
            } else {
                records = database.query('SELECT id, supplier_name FROM suppliers');
            }

            res.status(200).send(JSON.stringify(records)).end();
        } catch(e) {
            res.status(500).json({message: 'Error occurred while trying to retrieve suppliers from database'});
        }
        
    })

    app.get('/api/suppliers/:id', async (req, res) => {
        const id = req.params.id;

        try {
            const records = await database.query('SELECT * FROM suppliers WHERE id = ?', [id]);
            res.status(200).send(JSON.stringify(records)).end();
        } catch (e) {
            res.status(500).json({message: 'Error occured while trying to retrieve suppliers from database'});
        }
    })

};
