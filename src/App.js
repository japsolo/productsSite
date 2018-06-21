const faker = require('faker');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.listen(4000, () => console.log('Example app listening on port 4000!'));

app.use('/assets/', express.static(path.join(__dirname, '../public')));

let productsArray = [];

for (let i = 0; i < 12; i++) {
	let randomName = faker.commerce.productName();
	let randomPrice = faker.commerce.price();
	let randomDescription = faker.lorem.sentence();
	let randomImg = faker.image.avatar();
	productsArray = [
		...productsArray,
		{
			pdtoName: randomName,
			pdtoPrice: randomPrice,
			pdtoDesc: randomDescription,
			pdtoImage: randomImg
		}
	];
}

app.get('/', (req, res) => {
	// console.log(productsArray);
	res.render('index', {products: productsArray});
});

app.get('/producto/crear', (req, res) => {
	res.render('crear');
});

app.post('/producto/crear', urlEncodedParser, (req, res) => {
	/*
		1. instalamos body-parser
		2. Lo requerimos
		3. Creamos el middleware para parsear la data
		4. Como 2do parámetro pasamos el middleware
	*/
	req.body.pdtoImage = `/assets/images/${req.body.pdtoImage}`;
	console.log(('Form content: ', req.body));
	productsArray = [...productsArray, req.body];
	res.redirect('/'); // Redirecciona a donde queramos luego de recibir post
});
