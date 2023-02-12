const Player = require('./player.js')

module.exports = class Game{
    constructor(host)
    {
        this.host = host;
        this.players = Array();
        this.gameStatus = 'waiting';
    }
    addPlayer(req){
        this.players.push(new Player(req.body.name, req.session.id, null, false));
    }
    addRes(req, res){
        if(this.host.sid == req.session.id)
        {
            this.host.res = res;
            this.host.isClientOnline = true;
        }
        this.players.forEach(player => {
            if(player.sid == req.session.id)
            {
                player.res = res;
                player.isClientOnline = true;
            }
        });
    }
    deleteRes(req){
        this.players.forEach(player => {
            if(player.sid == req.session.id)
            {
                player.res = null;
                player.isClientOnline = false;
            }
        });
    }
    sendUpdate(g){
        console.log(this);

        if(this.host.res != null)
        {
            this.host.res.end(JSON.stringify(g));
            this.host.res = null;
            this.host.isClientOnline = false;
        }

        this.players.forEach(player => {
            if(player.res != null)
            {
                player.res.end(JSON.stringify(g));
                player.res = null;
                player.isClientOnline = false;
            }
        });
    }
}