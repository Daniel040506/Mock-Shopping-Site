const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'new_password',
    database: 'shop'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

for (let i = 0; i < 50; i++) {
    const name = faker.commerce.productName();
    const description = faker.lorem.sentence();
    const price = faker.commerce.price();
    const image_url = faker.image.url();

    const sql = 'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, description, price, image_url], (err, result) => {
        if (err) throw err;
        console.log(`Inserted product: ${name}`);
    });
}

db.end(() => {
    console.log('Finished seeding the database');
});