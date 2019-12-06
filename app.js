const express = require('express');
const app = express();
const path = require('path');

app.listen(9977, () => {
  console.log('server is running at 9977');
});

app.engine('html', require('express-art-template'));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(require('express-session')({
  secret: 'asdwqdaswxasx',
  resave: false,
  saveUninitialized: false
}));

app.use('/serverImage', express.static(path.join(__dirname, '../serverImage')));

global.routerPath = __dirname;
global.serverPath = 'http://127.0.0.1:9977/serverImage/';

app.use(require('./router/article_router'));
// app.use(require('./router/router_userMsg'));
// app.use(require('./router/router_backendNav'));
// app.use(require('./router/router_public'));
// app.use(require('./router/router_article'));
// app.use(require('./router/router_labels'));
// app.use(require('./router/router_role'));