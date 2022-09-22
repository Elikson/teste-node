const express = require('express')
const mysql = require('mysql2/promise');
const app = express()
const port = 443

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/list-products', async (req, res) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'productsdb' });
    const [rows, fields] = await connection.execute('SELECT * FROM `produto`');

    res.send(rows)
})

app.post('/insert-product', async (req, res) => {
    const product = req.body.product;
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'productsdb' });
    const [rows, fields] = await connection.execute("INSERT INTO `produto` (`_id`, `nome`, `preco`, `descricao`, `categoria`) VALUES (NULL, '" + product.name + "', '" + product.price + "', '" + product.description + "', '" + product.category + "')");
    res.json({ body: product })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))