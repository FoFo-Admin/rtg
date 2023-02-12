const Player = require('./player.js');
const Game = require('./game.js');
const ListPlayer = require('./listPlayer.js');

exports.createGame = function(req){
    return new Player(req.body.name, req.session.id, null, false);
}

exports.generateCode = function(games){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;

    let result = '';

    do{
        result = '';

        let counter = 0;
        while (counter < 4) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }

    }while(games.has(result));
    return result;
}

exports.isHost = function(games, req){
    game = games.get(req.params.code);

    if(game.host.sid == req.session.id)
        return true;
    else 
        return false;
}

exports.isPlayer = function(games, req){
    game = games.get(req.params.code);
    res = false;

    game.players.forEach(player => {
        if(player.sid == req.session.id)
            res=true;
    });
    return res;
}

exports.generatePlayerList = function(games, code){

    function playersList(players){
        newPlayerArray = Array();
        players.forEach(player => {
            newPlayerArray.push(new ListPlayer(player));
        });
        return newPlayerArray;
    }

    game = games.get(code);

    const lobby = {
        lobby: {
            code: code,
            host: new ListPlayer(game.host).name,
            players: playersList(game.players)
        }
    }

    return lobby;
}