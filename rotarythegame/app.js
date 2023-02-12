const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Player = require('./controllers/player.js');
const Game = require('./controllers/game.js');
const lobby = require('./controllers/lobby');

const app = express();

let games = new Map();

//Use

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({
    name: "sid",
    resave: false,
    rolling: true,
    secret: 'rtg',
    cookie: {
        maxAge: 1000 * 60 * 60 * 1,
        sameSite: true,
        secure: false
    }
}));


//Set

app.set('port', process.env.PORT || 3000);


//Get
app.get('/', (req, res) => {
    console.log(req.session.id);
    res.render('index.ejs');
});

app.get('/rules', (req, res) => {
    res.send("Rotary The Game");
});

app.get('/lobby/:code', (req, res) => {
    console.log(games);
    if (games.has(req.params.code)) {
        if (lobby.isHost(games, req))
            res.render('waiting-host.ejs');
        else if (lobby.isPlayer(games, req))
            res.render('waiting-player.ejs');
        else
            res.send('403');
    }
    //res.send("Your name is " + games.get(req.params.code).host.name);
    else
        res.send("Game is not exist");
});

app.get('/lobby/:code/players', (req, res) => {
    if (games.has(req.params.code)) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(lobby.generatePlayerList(games, req.params.code)));
    }
    else
        res.end("Game is not exist");
});

app.get('/lobby/:code/players/long', (req, res) => {
    if (games.has(req.params.code)) {
        res.setHeader('Content-Type', 'application/json');
        games.get(req.params.code).addRes(req, res);
    }
    else
        res.end("Game is not exist");
});

app.post('/lobby', (req, res) => {
    if (req.body.gameSubmit) {
        const newCode = lobby.generateCode(games);
        games.set(newCode, new Game(lobby.createGame(req)));
        res.redirect(`/lobby/${newCode}`);
    }
    if (req.body.codeSubmit) {
        if (games.has(req.body.code)) {
            games.get(req.body.code).addPlayer(req);
            games.get(req.body.code).sendUpdate(lobby.generatePlayerList(games, req.body.code));
        }
        res.redirect(`/lobby/${req.body.code}`);

    }


});

app.get('*', function (req, res) {
    res.status(404).send('404');
});


//Listen
app.listen(app.get('port'), () => {
    console.log(`localhost:${app.get('port')}`);
});

module.exports = app;