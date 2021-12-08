const app = require('express')();
let path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('', require('./routes/index'));

module.exports = () => {
    app.listen(process.env.BOT_PORT);
}