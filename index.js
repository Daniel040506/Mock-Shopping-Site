const express = require('express');


const app = express();
const port = 3000;



const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'new_password',
    database: 'shop'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Routes will go here

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.post('/api/products', (req, res) => {
    const { name, description, price, image_url } = req.body;
    const sql = 'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, description, price, image_url], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...req.body });
    });
});

app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, image_url } = req.body;
    const sql = 'UPDATE products SET name = ?, description = ?, price = ?, image_url = ? WHERE id = ?';
    db.query(sql, [name, description, price, image_url, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Product updated', ...req.body });
    });
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Product deleted' });
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

