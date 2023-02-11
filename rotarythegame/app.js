const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

let games = new Map();

//Use

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(session({
    name: "SID",
    resave: false,
    rolling: true,
    secret: 'ROTARY: THE GAME',
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
    if(games.has(req.params.code))
        res.send("Your name is " + games.get(req.params.code));
    else 
        res.send("Game is not exist");
});

app.post('/lobby', (req, res) => {
    games.set(req.body.code, req.body.name);
    res.redirect(`/lobby/${req.body.code}`);
});

app.get('*', function(req, res){
    res.status(404).send('404');
  });


//Listen
app.listen(app.get('port'), () => {
    console.log(`localhost:${app.get('port')}`);
});

module.exports = app;