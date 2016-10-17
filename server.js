/**
 * Created by lunavod on 02.08.16.
 */

var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.redirect('/app/')
});
app.get('/app/*', function (req, res) {
    res.sendFile('index.html', {root: __dirname+'/'})
});
app.use('/static', express.static('public'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
