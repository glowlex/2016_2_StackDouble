'use strict';

let express = require('express');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');
let path = require('path');

let technolibs = require('technolibs');

app.use('/', express.static('public', { maxAge: 1 }));

/*app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});
/*/
app.use('/registration', express.static('public', { maxAge: 1 }));
app.use('/game', (req, res) => {
	res.sendFile(path.join(__dirname, 'html/game_window.html'));
});
app.use('/waitingroom', (req, res) => {
	res.sendFile(path.join(__dirname, 'html/main_menu.html'));
});
app.use('/topList', (req, res) => {
	res.sendFile(path.join(__dirname, 'html/score_board.html'));
});

app.use(express.static(__dirname + '/html'));

technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.get('/api/session', (req, res) => {
	res.send(technoDoc.mock(require('./api/scheme/Session')))
});

app.post('/api/messages', (req, res) => {
	technolibs.publish(req.body).then(body => res.json(req.body));
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
/*
 app.use('*', (req, res) => {
 res.sendFile(path.join(__dirname, 'public/index.html'));
 });
 */
