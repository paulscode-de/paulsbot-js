let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {

    // let response = "paulsbot is running.\n\n"
    // response += Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n')
    // res.send(response)

    res.render('index', {
        title: 'paulsbot',
        commands: require("../help"),
        prefix: require('../config').prefix
    });
});

module.exports = router;