const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, './public')));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


let routes = require('./controllers/movies_controller.js');

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log(`App listening on http://localhost:${PORT}`);
})